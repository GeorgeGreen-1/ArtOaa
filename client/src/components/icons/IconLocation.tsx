type Props = {
  color?: string;
};

export const IconLocation: React.FC<Props> = ({ color = "#222222" }) => {
  return (
    <svg
      width="15.000000"
      height="16.805176"
      viewBox="0 0 15 16.8052"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M7.5 0C9.48926 0 11.3965 0.790039 12.8037 2.19678C14.21 3.60303 15 5.51074 15 7.5C15 10.0615 13.6035 12.1582 12.1318 13.6626C11.3965 14.4058 10.5938 15.0796 9.73535 15.6758L9.37988 15.9175L9.21289 16.0283L8.89941 16.2285L8.61914 16.3989L8.27246 16.6011C8.03711 16.7349 7.77051 16.8052 7.5 16.8052C7.22949 16.8052 6.96289 16.7349 6.72754 16.6011L6.38086 16.3989L5.94727 16.1323L5.78711 16.0283L5.44629 15.8008C4.51953 15.1738 3.65625 14.4575 2.86816 13.6626C1.39648 12.1577 0 10.0615 0 7.5C0 5.51074 0.790039 3.60303 2.19629 2.19678C3.60352 0.790039 5.51074 0 7.5 0ZM7.5 5C7.17188 5 6.84668 5.06445 6.54297 5.19043C6.24023 5.31592 5.96484 5.5 5.73242 5.73242C5.5 5.96436 5.31641 6.23975 5.19043 6.54346C5.06445 6.84668 5 7.17188 5 7.5C5 7.82812 5.06445 8.15332 5.19043 8.45654C5.31641 8.76025 5.5 9.03564 5.73242 9.26758C5.96484 9.5 6.24023 9.68408 6.54297 9.80957C6.84668 9.93555 7.17188 10 7.5 10C8.16309 10 8.79883 9.73682 9.26758 9.26758C9.73633 8.79883 10 8.16309 10 7.5C10 6.83691 9.73633 6.20117 9.26758 5.73242C8.79883 5.26318 8.16309 5 7.5 5Z"
        fill={color}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};