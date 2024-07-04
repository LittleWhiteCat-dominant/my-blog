// components/CyberpunkCanvas.tsx
import { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";

const CyberpunkCanvas: React.FC = () => {
  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });

    let background: PIXI.Sprite;

    const loadTexture = async () => {
      const texture = await Assets.load("./assets/images/background.png");
      background = new PIXI.Sprite(texture);
      // 将 Sprite 缩放以适应整个屏幕
      background.scale.x = app.renderer.width / background.width;
      background.scale.y = app.renderer.height / background.height;
      // 添加到舞台
      app.stage.addChild(background);
    };

    const resize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const minWidth = 375;
      const minHeight = 700;

      // Calculate renderer and canvas sizes based on current dimensions
      const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
      const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
      const scale = scaleX > scaleY ? scaleX : scaleY;
      const width = windowWidth * scale;
      const height = windowHeight * scale;

      // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
      app.renderer.view.style.width = `${windowWidth}px`;
      app.renderer.view.style.height = `${windowHeight}px`;
      window.scrollTo(0, 0);

      // Update renderer and navigation screens dimensions
      console.log("width: " + windowWidth + " height: " + windowHeight);
      app.renderer.resize(width, height);

      if (background != null) {
        background.width = window.innerWidth;
        background.height = window.innerHeight;
      }
    };

    document.getElementById("pixi-container").appendChild(app.view);

    window.addEventListener("resize", resize);

    loadTexture();
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      app.destroy();
    };
  }, []);

  return <div id="pixi-container" />;
};

export default CyberpunkCanvas;
