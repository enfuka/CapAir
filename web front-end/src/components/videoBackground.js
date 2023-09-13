export default function VideoBackground({ video }) {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
          opacity: "0.3",
        }}
      ></div>

      {/iPad|iPhone|iPod/.test(navigator.userAgent) ? (
        <img
          src={`${video}.gif`}
          alt="background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          controls={false}
          playsInline
          poster="true"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={`${video}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
