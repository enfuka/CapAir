export default function executeScrollWithOffset(ref, offset) {
  try {
    window.scrollTo({
      behavior: "smooth",
      top:
        ref.current.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        offset,
    });
  } catch (error) {
    console.error("AUTO-SCROLL ERROR", error);
  }
}
