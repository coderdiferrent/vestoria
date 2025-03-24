
const AnimationStyles = () => {
  return (
    <style>
      {`
        @keyframes slideAndRotate {
          0% {
            transform: perspective(1000px) rotateY(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(360deg);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  );
};

export default AnimationStyles;
