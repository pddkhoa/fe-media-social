export function MessageIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      id="mail"
      {...props}
    >
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#008EE7"></stop>
          <stop offset="100%" stopColor="#00D6FA"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <rect width="120" height="120" fill="url(#a)" rx="28"></rect>
          <path
            fill="#FFF"
            d="M25.114 84.964l21.196-21.95 5.13 5.165a12.553 12.553 0 0 0 17.84 0l4.64-4.672L94.666 84.99c-.331.07-.675.106-1.027.106H26.26c-.394 0-.778-.046-1.146-.132zm73.392-46.215c.087.37.133.755.133 1.151v40.196c0 1.29-.489 2.466-1.29 3.353L76.033 61.378l22.472-22.63zM21.36 81.094V40.9c0-.868.221-1.685.61-2.397l22.226 22.382L22.482 83.37a4.983 4.983 0 0 1-1.122-2.277zm75.467-45.046L67.189 65.685c-3.905 3.906-10.237 3.906-14.142 0L23.26 35.9c.835-.627 1.874-.999 3-.999h67.378a4.98 4.98 0 0 1 3.188 1.148z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function FeedIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 120 120"
      id="news"
      {...props}
    >
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#F53FC6"></stop>
          <stop offset="100%" stopColor="#D135FA"></stop>
        </linearGradient>
        <filter
          id="b"
          width="120%"
          height="121.6%"
          x="-15%"
          y="-10.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-4"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="2"
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          ></feColorMatrix>
        </filter>
        <path
          id="c"
          d="M25 24h76v69a5 5 0 0 1-5 5H25V24zm-4 74c2 0 4-2 4-4v4h-4z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <rect width="120" height="120" fill="url(#a)" rx="28"></rect>
          <path fill="#FFF" d="M17 32h14v66H21a4 4 0 0 1-4-4V32z"></path>
          <g>
            <use fill="#000" filter="url(#b)" xlinkHref="#c"></use>
            <use fill="#FFF" xlinkHref="#c"></use>
          </g>
          <path
            fill="#C8C7CC"
            d="M35 70h66v4H35a2 2 0 110-4zM35 78h66v4H35a2 2 0 110-4zM35 86h66v4H35a2 2 0 110-4z"
          ></path>
          <path
            fill="#FF5B75"
            d="M62.42 51.826c.294.293.496.68.559 1.11l.021.007v6.793l-.018.017a1.981 1.981 0 0 1-2.229 2.229l-.017.018h-6.793l-.007-.021a1.976 1.976 0 0 1-1.11-.56l-.015.015-19.245-19.245.014-.015a1.976 1.976 0 0 1-.559-1.11L33 41.057v-6.793l.018-.017a1.981 1.981 0 0 1 2.229-2.229l.017-.018h6.793l.007.021c.376.055.718.217.995.453l.018-.02 19.357 19.357-.014.015zm.558-10.556a2.027 2.027 0 0 1-3.43 1.144l-.022.007-6.947-6.947.007-.022a2.027 2.027 0 0 1 1.143-3.43l.008-.022h6.947l.018.018a2.026 2.026 0 0 1 2.28 2.28l.018.018v6.947l-.022.007zM33.022 52.73a2.027 2.027 0 0 1 3.43-1.144l.022-.007 6.947 6.947-.007.022a2.027 2.027 0 0 1-1.143 3.43l-.008.022h-6.947l-.018-.018a2.026 2.026 0 0 1-2.28-2.28L33 59.684v-6.947l.022-.007z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function TuneIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      id="itunes"
      {...props}
    >
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#F53FC6"></stop>
          <stop offset="100%" stopColor="#D135FA"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <rect width="120" height="120" fill="url(#a)" rx="28"></rect>
        <path
          fill="#FFFCFF"
          d="M60.381 82.861 79.762 68.4 72.359 45H48.403L41 68.4z"
        ></path>
        <path
          fill="#FFF"
          fillOpacity=".82"
          d="M60 32.5v13L48 46l10-29h.015c.121-1.02.964-2 1.985-2 1.021 0 1.864.98 1.985 2H62l11 29.5-13-1v-13zM77.287 85.532 69.83 74.883 79.66 68l8.155 29.082-.012.008c.486.905.358 2.192-.479 2.777-.836.586-2.089.267-2.773-.5l-.012.009L56.999 80.5l12.831-5.617 7.457 10.649z"
        ></path>
        <path
          fill="#FFF"
          fillOpacity=".82"
          d="m42.867 85.532 7.457-10.65L41.5 66.5l-9.161 30.581.012.009c-.487.906-.358 2.191.479 2.777.837.586 2.088.267 2.773-.5l.012.009L61.001 82.5l-10.677-7.617-7.457 10.649z"
        ></path>
        <path
          fill="#FFF"
          fillOpacity=".82"
          d="M45.863 57.454 46 57.5 48.74 45.02l-31.204.002c-.955-.094-2.004.4-2.297 1.301-.283.87.224 1.844 1.003 2.349l25.999 20.85 3.622-12.067zM88.383 52.708 75.605 56.86 71.32 45.022h31.205c.956-.093 2.005.4 2.298 1.302.282.87-.225 1.844-1.004 2.349h.001l-26 20.85-2.215-12.662 12.778-4.152z"
        ></path>
      </g>
    </svg>
  );
}

export function BookmarkIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      id="bookmark-check"
      {...props}
    >
      <path
        fill="url(#paint0_linear_201_2362)"
        d="M17 1H7.00002C6.17772 1.03129 5.40107 1.38618 4.83918 1.98739C4.2773 2.58861 3.97569 3.38746 4.00002 4.21V19.79C3.98952 20.3929 4.14904 20.9865 4.46031 21.503C4.77158 22.0194 5.22202 22.4377 5.76002 22.71C6.24029 22.9459 6.7781 23.0392 7.30978 22.979C7.84145 22.9187 8.34473 22.7074 8.76002 22.37L11.44 20.26C11.5922 20.1349 11.783 20.0664 11.98 20.0664C12.177 20.0664 12.3679 20.1349 12.52 20.26L15.2 22.37C15.6164 22.7052 16.1195 22.9151 16.6507 22.9753C17.1818 23.0355 17.7192 22.9435 18.2 22.71C18.7455 22.4433 19.2042 22.0274 19.5228 21.5106C19.8414 20.9937 20.0069 20.3971 20 19.79V4.21C20.0244 3.38746 19.7227 2.58861 19.1609 1.98739C18.599 1.38618 17.8223 1.03129 17 1ZM15.27 7.77L12.65 10.39C12.5566 10.4827 12.4458 10.556 12.3239 10.6058C12.2021 10.6555 12.0716 10.6808 11.94 10.68C11.8084 10.6808 11.678 10.6555 11.5561 10.6058C11.4343 10.556 11.3235 10.4827 11.23 10.39L9.92002 9.08C9.73172 8.8917 9.62593 8.6363 9.62593 8.37C9.62593 8.1037 9.73172 7.8483 9.92002 7.66C10.1083 7.4717 10.3637 7.36591 10.63 7.36591C10.8963 7.36591 11.1517 7.4717 11.34 7.66L11.94 8.27L13.85 6.35C14.0383 6.1617 14.2937 6.05591 14.56 6.05591C14.8263 6.05591 15.0817 6.1617 15.27 6.35C15.4583 6.5383 15.5641 6.7937 15.5641 7.06C15.5641 7.3263 15.4583 7.5817 15.27 7.77Z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_201_2362"
          x1="12"
          x2="12"
          y1="1"
          y2="22.997"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F53FC6"></stop>
          <stop offset="100%" stopColor="#D135FA"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
