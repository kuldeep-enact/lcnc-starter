var dropzone = new Dropzone('.demo-upload', {
  url: "/upload/",      
  maxFilesize: 4,
  addRemoveLinks: true,
  acceptedFiles: ".jpeg, .jpg, .png, .gif, .WebP, .svg",
  previewTemplate: document.querySelector('#preview-template').innerHTML,
  parallelUploads: 2,
  thumbnailHeight: 50,
  thumbnailWidth: 50,
  maxFilesize: 1,
  filesizeBase: 100000000000,
  success: function(file, response) {
   file.previewElement.classList.add("image__open");
 },
 thumbnail: function(file, dataUrl) {
  if (file.previewElement) {
    file.previewElement.classList.remove("dz-file-preview");
    var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
    for (var i = 0; i < images.length; i++) {
      var thumbnailElement = images[i];
      thumbnailElement.alt = file.name;
      thumbnailElement.src = dataUrl;
    }
    setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 800);
  }
}

});


// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404

var minSteps = 6,
maxSteps = 100,
timeBetweenSteps = 300,
bytesPerStep = 10000;

dropzone.uploadFiles = function(files) {
  var self = this;

  for (var i = 0; i < files.length; i++) {

    var file = files[i];
    totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

    for (var step = 0; step < totalSteps; step++) {
      var duration = timeBetweenSteps * (step + 1);
      setTimeout(function(file, totalSteps, step) {
        return function() {
          file.upload = {
            progress: 100 * (step + 1) / totalSteps,
            total: file.size,
            bytesSent: (step + 1) * file.size / totalSteps
          };

          self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
          if (file.upload.progress == 100) {
            file.status = Dropzone.SUCCESS;
            self.emit("success", file, 'success', null);
            self.emit("complete", file);
            self.processQueue();
          }
        };
      }(file, totalSteps, step), duration);
    }
  }
}