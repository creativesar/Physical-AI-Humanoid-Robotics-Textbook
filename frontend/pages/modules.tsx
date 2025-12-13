import React, { type ReactElement } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Modules(): ReactElement {
  const modules = [
    { id: '01', path: '01-introduction-to-physical-ai/index', title: 'Introduction to Physical AI & Embodied Intelligence', description: 'Understanding Physical AI, embodied vs. disembodied intelligence' },
    { id: '02', path: '02-robotics-mechatronics-fundamentals/index', title: 'Robotics & Mechatronics Fundamentals', description: 'Robotics taxonomy, mechanical structure, motors, actuators, power systems' },
    { id: '03', path: '03-ros2-foundations/index', title: 'ROS 2 Foundations', description: 'ROS 2 architecture, nodes, topics, services, communication patterns' },
    { id: '04', path: '04-urdf-robot-description-models/index', title: 'URDF & Robot Description Models', description: 'URDF basics, links, joints, XACRO macros, visualization' },
    { id: '05', path: '05-kinematics/index', title: 'Kinematics (FK, IK, DH)', description: 'Forward and inverse kinematics, DH parameters, Jacobian concepts' },
    { id: '06', path: '06-robot-dynamics-humanoid-control/index', title: 'Robot Dynamics & Humanoid Control', description: 'Physics engines, stability, ZMP, gait cycles, control strategies' },
    { id: '07', path: '07-sensors-perception/index', title: 'Sensors & Perception', description: 'IMUs, LiDAR, cameras, Intel RealSense, sensor fusion' },
    { id: '08', path: '08-gazebo-simulation/index', title: 'Gazebo Simulation', description: 'Simulation environment, robot spawning, sensor simulation' },
    { id: '09', path: '09-isaac-sim-isaac-ros/index', title: 'Isaac Sim & Isaac ROS', description: 'NVIDIA robotics simulation platform, ROS bridge' },
    { id: '10', path: '10-unity-robotics-digital-humans/index', title: 'Unity Robotics, Digital Humans', description: 'Unity-ROS integration, character rigging, motion retargeting' },
    { id: '11', path: '11-visual-slam/index', title: 'Visual SLAM (VSLAM)', description: 'SLAM principles, feature extraction, pose estimation, mapping' },
    { id: '12', path: '12-navigation/index', title: 'Navigation (Nav2)', description: 'Nav2 architecture, localization, mapping, path planning' },
    { id: '13', path: '13-humanoid-locomotion-motion-generation/index', title: 'Humanoid Locomotion & Motion Generation', description: 'Biped motion, gait planning, balancing control, safety' },
    { id: '14', path: '14-vision-language-action-robotics/index', title: 'Vision-Language-Action Robotics', description: 'Multimodal models, CLIP, VLA, policy learning' },
    { id: '15', path: '15-digital-twin-workstation/index', title: 'Digital Twin Workstation', description: 'Hardware requirements, GPU setup, Isaac Sim workstation' },
    { id: '16', path: '16-jetson-robotics-hardware/index', title: 'Jetson Robotics Hardware', description: 'Jetson models, flashing, ROS installation, sensor wiring' },
    { id: '17', path: '17-full-humanoid-system-architecture/index', title: 'Full Humanoid System Architecture', description: 'System overview, perception, control, motion, safety layers' },
    { id: '18', path: '18-capstone-project/index', title: 'Capstone Project', description: 'Build simulation, perception, control, navigation pipelines' },
    { id: '19', path: '19-glossary-references/index', title: 'Glossary & References', description: 'Key terms, definitions, academic references' },
  ];

  return (
    <Layout title="Modules" description="List of all 19 modules in the Physical AI & Humanoid Robotics Textbook">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            <h1 style={{ fontFamily: 'Sora, sans-serif', textAlign: 'center' }}>Textbook Modules</h1>
            <p className="text--center" style={{ marginBottom: '2rem' }}>
              The comprehensive curriculum consists of 19 in-depth modules covering Physical AI and Humanoid Robotics
            </p>
          </div>
        </div>

        <div className="row">
          {modules.map((module) => (
            <div className="col col--4 margin-bottom--lg" key={module.id}>
              <div
                style={{
                  padding: '1.5rem',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  minHeight: '150px',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <h3 style={{ fontFamily: 'Sora, sans-serif', color: '#25c19f' }}>
                  Module {module.id}: {module.title}
                </h3>
                <p>{module.description}</p>
                <Link
                  to={`/docs/${module.path}`}
                  className="button button--secondary button--sm"
                  style={{ marginTop: '10px' }}
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}