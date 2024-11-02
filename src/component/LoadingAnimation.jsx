// components/LoadingAnimation.js

import React from "react";
import styles from "./LoadingAnimation.module.css"; // Import CSS module

function LoadingAnimation() {
  return (
    <div id={styles.page}>
      <div id={styles.container}>
        <div id={styles.ring}></div>
        <div id={styles.ring}></div>
        <div id={styles.ring}></div>
        <div id={styles.ring}></div>
        <div id={styles.h3}>Loading</div>
      </div>
    </div>
  );
}

export default LoadingAnimation;
