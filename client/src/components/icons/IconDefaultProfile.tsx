type Props = {
  color?: string;
};

export const IconDefaultProfile: React.FC<Props> = ({ color = "#222222" }) => {
  return (
    <svg
      width="43.799805"
      height="42.900391"
      viewBox="0 0 43.7998 42.9004"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M12.167 9.5332C12.167 7.00488 13.1924 4.58008 15.0176 2.79199C16.8428 1.00488 19.3184 0 21.9004 0C24.4814 0 26.957 1.00488 28.7822 2.79199C30.6074 4.58008 31.6338 7.00488 31.6338 9.5332C31.6338 12.0615 30.6074 14.4863 28.7822 16.2744C26.957 18.0625 24.4814 19.0664 21.9004 19.0664C19.3184 19.0664 16.8428 18.0625 15.0176 16.2744C13.1924 14.4863 12.167 12.0615 12.167 9.5332ZM12.167 23.833C8.93945 23.833 5.8457 25.0889 3.56348 27.3232C1.28223 29.5586 0 32.5898 0 35.75C0 37.6465 0.769531 39.4648 2.1377 40.8057C3.50684 42.1465 5.36426 42.9004 7.2998 42.9004L36.5 42.9004C38.4365 42.9004 40.293 42.1465 41.6621 40.8057C43.0312 39.4648 43.7998 37.6465 43.7998 35.75C43.7998 32.5898 42.5186 29.5586 40.2363 27.3232C37.9551 25.0889 34.8604 23.833 31.6338 23.833L12.167 23.833Z"
        fill={color}
        fillOpacity="1.000000"
        fillRule="evenodd"
      />
    </svg>
  );
};