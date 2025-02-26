/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 megi.glb 
Author: ffish.asia / floraZia.com (https://sketchfab.com/ffishAsia-and-floraZia)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/amur-catfish-silurus-asotus-62643dfb143a48ca97bdb09cd075e680
Title: ナマズ （マナマズ）♀ Amur Catfish, Silurus asotus
*/

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TweenMax, Power1 } from "gsap";

export function MegiFish(props) {
  const { nodes, materials } = useGLTF("/megi.glb");

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
      fishGroupRef.current.position.lerp(
        fishMovement.current.targetPosition,
        delta * 0.5
      );

      // 부드러운 회전
      const lookAtVector = new THREE.Vector3()
        .copy(fishMovement.current.targetPosition)
        .sub(fishGroupRef.current.position);
      fishGroupRef.current.rotation.y = Math.atan2(
        lookAtVector.x,
        lookAtVector.z
      );

      // 일정 시간이 지날 때마다 새로운 목표 위치 설정
      if (state.clock.elapsedTime % 5 < delta) {
        updateTargetPosition();
      }
    }
  });

  const updateTargetPosition = () => {
    fishMovement.current.targetPosition.set(
      Math.random() * 40 - 20,
      Math.random() * 2 - 10,
      Math.random() * 40 - 20
    );
    TweenMax.to(fishMovement.current.targetPosition, 15, {
      x: Math.random() * 40 - 20,
      y: Math.random() * 80 - 10,
      z: Math.random() * 40 - 20,
      ease: Power1.easeInOut,
    });
  };

  return (
    <group {...props} ref={fishGroupRef} dispose={null}>
      <group rotation={[-2.843, -0.035, 1.868]} scale={0.37}>
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials["Q1113-W10-1all-2_tex0"]}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials["Q1113-W10-1all-2_tex0"]}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials["Q1113-W10-1all-2_tex0"]}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials["Q1113-W10-1all-2_tex0"]}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials["Q1113-W10-1all-2_tex0"]}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials["Q1113-W10-1all-2_tex0"]}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials["Q1113-W10-1all-2_tex1"]}
        />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials["Q1113-W10-1all-2_tex1"]}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials["Q1113-W10-1all-2_tex1"]}
        />
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials["Q1113-W10-1all-2_tex1"]}
        />
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials["Q1113-W10-1all-2_tex1"]}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials["Q1113-W10-1all-2_tex1"]}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials["Q1113-W10-1all-2_tex2"]}
        />
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials["Q1113-W10-1all-2_tex2"]}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials["Q1113-W10-1all-2_tex2"]}
        />
        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials["Q1113-W10-1all-2_tex2"]}
        />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials["Q1113-W10-1all-2_tex2"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/megi.glb");
