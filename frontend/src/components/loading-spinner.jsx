import React from "react";
import styled from 'styled-components';

const Loader = () => {
    return(
        <styleWrapper>
            <aside class="container-loader">
            <div style="--s: 0" class="aro"></div>
            <div style="--s: 1" class="aro"></div>
            <div style="--s: 2" class="aro"></div>
            <div style="--s: 3" class="aro"></div>
            <div style="--s: 4" class="aro"></div>
            <div style="--s: 5" class="aro"></div>
            <div style="--s: 6" class="aro"></div>
            <div style="--s: 7" class="aro"></div>
            <div style="--s: 8" class="aro"></div>
            <div style="--s: 9" class="aro"></div>
            <div style="--s: 10" class="aro"></div>
            <div style="--s: 11" class="aro"></div>
            <div style="--s: 12" class="aro"></div>
            <div style="--s: 13" class="aro"></div>
            <div style="--s: 14" class="aro"></div>
            </aside>
        </styleWrapper>

    );
}

const styleWrapper = styled.div`
/* From Uiverse.io by 20essentials */ 
.container-loader {
  width: 300px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(500px) rotateX(60deg);

  .aro {
    position: absolute;
    inset: calc(var(--s) * 10px);
    box-shadow: inset 0 0 80px dodgerblue;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    animation: standalone 3s infinite ease-in-out both;
    animation-delay: calc(var(--s) * -0.1s);
  }
}

@keyframes standalone {
  0%,
  100% {
    transform: translateZ(-100px) scaleX(-1);
  }
  50% {
    transform: translateZ(100px) scaleX(1);
  }
}
`
export default Loader;