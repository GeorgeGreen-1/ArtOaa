type Props = {
  size?: string;
};

export const IconCross: React.FC<Props> = ({ size = "33" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M29.3682 26.3372C29.7705 26.7395 29.9961 27.2852 29.9961 27.8542C29.9961 28.4233 29.7705 28.9692 29.3682 29.3716C28.9658 29.7739 28.4199 30 27.8506 30C27.2812 30 26.7354 29.7739 26.333 29.3716L15 18.0354L3.66309 29.3679C3.26074 29.7703 2.71484 29.9963 2.14551 29.9963C1.57715 29.9963 1.03125 29.7703 0.628906 29.3679C0.225586 28.9656 0 28.4199 0 27.8508C0 27.2817 0.225586 26.7358 0.628906 26.3335L11.9658 15.001L0.631836 3.66455C0.229492 3.26221 0.00390625 2.71655 0.00390625 2.14746C0.00390625 1.57837 0.229492 1.03271 0.631836 0.630127C1.03418 0.227783 1.58008 0.00170898 2.14941 0.00170898C2.71875 0.00170898 3.26465 0.227783 3.66699 0.630127L15 11.9666L26.3369 0.628418C26.7393 0.226074 27.2852 0 27.8545 0C28.4229 0 28.9688 0.226074 29.3711 0.628418C29.7734 1.03076 30 1.57666 30 2.14575C30 2.71484 29.7734 3.2605 29.3711 3.66284L18.0342 15.001L29.3682 26.3372Z"
        fill="#FCA311"
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};
