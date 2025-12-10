import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {
          type: 'doc',
          id: 'intro',
        },
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 01: Introduction to Physical AI & Embodied Intelligence',
      items: [
        {
          type: 'doc',
          id: 'introduction-to-physical-ai/index',
        },
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 02: Robotics & Mechatronics Fundamentals',
      items: [
        {
          type: 'doc',
          id: 'robotics-mechatronics-fundamentals/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 03: ROS 2 Foundations',
      items: [
        {
          type: 'doc',
          id: 'ros2-foundations/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 04: URDF & Robot Description Models',
      items: [
        {
          type: 'doc',
          id: 'urdf-robot-description-models/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 05: Kinematics (FK, IK, DH)',
      items: [
        {
          type: 'doc',
          id: 'kinematics/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 06: Robot Dynamics & Humanoid Control',
      items: [
        {
          type: 'doc',
          id: 'robot-dynamics-humanoid-control/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 07: Sensors & Perception',
      items: [
        {
          type: 'doc',
          id: 'sensors-perception/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 08: Gazebo Simulation',
      items: [
        {
          type: 'doc',
          id: 'gazebo-simulation/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 09: Isaac Sim & Isaac ROS',
      items: [
        {
          type: 'doc',
          id: 'isaac-sim-isaac-ros/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 10: Unity Robotics, Digital Humans',
      items: [
        {
          type: 'doc',
          id: 'unity-robotics-digital-humans/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 11: Visual SLAM (VSLAM)',
      items: [
        {
          type: 'doc',
          id: 'visual-slam/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 12: Navigation (Nav2)',
      items: [
        {
          type: 'doc',
          id: 'navigation/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 13: Humanoid Locomotion & Motion Generation',
      items: [
        {
          type: 'doc',
          id: 'humanoid-locomotion-motion-generation/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 14: Vision-Language-Action Robotics',
      items: [
        {
          type: 'doc',
          id: 'vision-language-action-robotics/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 15: Digital Twin Workstation',
      items: [
        {
          type: 'doc',
          id: 'digital-twin-workstation/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 16: Jetson Robotics Hardware',
      items: [
        {
          type: 'doc',
          id: 'jetson-robotics-hardware/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 17: Full Humanoid System Architecture',
      items: [
        {
          type: 'doc',
          id: 'full-humanoid-system-architecture/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 18: Capstone Project',
      items: [
        {
          type: 'doc',
          id: 'capstone-project/index',
        },
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Module 19: Glossary & References',
      items: [
        {
          type: 'doc',
          id: 'glossary-references/index',
        },
      ],
      collapsed: true,
    },
  ],
};

export default sidebars;