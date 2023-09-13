export const checkImagesLoaded = () =>
  new Promise((resolve, reject) => {
    var intervalID = setInterval(() => {
      if (
        Array.from(document.querySelectorAll("img")).every(
          (element) => element.complete
        ) &&
        Array.from(document.querySelectorAll("video")).every(
          (element) => element.readyState === 4
        )
      ) {
        clearInterval(intervalID);
        resolve();
      }
    }, 300);
  });
