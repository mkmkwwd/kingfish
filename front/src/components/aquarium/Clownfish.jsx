/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 clownfish.glb 
Author: JayNme (https://sketchfab.com/JayNmeGaming)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/oxidane-clownfish-1732838d86b24b6a841807a6b8703565
Title: Oxidane - Clownfish
*/

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TweenMax, Power1 } from "gsap";

export function Clownfish(props) {
  const fishGroupRef = useRef();
  const fishMovement = useRef({
    speed: 0.02,
    targetPosition: new THREE.Vector3(), // Target position for smooth movement
  });

  useEffect(() => {
    // Set initial target position
    updateTargetPosition();
  }, []);

  useFrame((state, delta) => {
    if (fishGroupRef.current) {
      // 부드러운 이동
      fishGroupRef.current.position.lerp(fishMovement.current.targetPosition, delta * 0.5);

      // 부드러운 회전
      const lookAtVector = new THREE.Vector3().copy(fishMovement.current.targetPosition).sub(fishGroupRef.current.position);
      fishGroupRef.current.rotation.y = Math.atan2(lookAtVector.x, lookAtVector.z);

      // 일정 시간이 지날 때마다 새로운 목표 위치 설정
      if (state.clock.elapsedTime % 5 < delta) {
        updateTargetPosition();
      }
    }
  });

  const updateTargetPosition = () => {
    fishMovement.current.targetPosition.set(Math.random() * 10 - 5, Math.random() * 2 - 10, Math.random() * 10 - 5);
    TweenMax.to(fishMovement.current.targetPosition, 5, {
      x: Math.random() * 10 - 5,
      y: Math.random() * 2 - 10,
      z: Math.random() * 10 - 5,
      ease: Power1.easeInOut,
    });
  };

  const { nodes, materials } = useGLTF("/clownfish.glb");
  return (
    <group {...props} ref={fishGroupRef} dispose={null}>
      <mesh geometry={nodes.Cube003_Material_0.geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.3} />
    </group>
  );
}

useGLTF.preload("/clownfish.glb");
