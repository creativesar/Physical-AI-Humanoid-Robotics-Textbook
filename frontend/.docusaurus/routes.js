import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/auth/forgot-password',
    component: ComponentCreator('/auth/forgot-password', 'b1f'),
    exact: true
  },
  {
    path: '/auth/login',
    component: ComponentCreator('/auth/login', '134'),
    exact: true
  },
  {
    path: '/auth/signup',
    component: ComponentCreator('/auth/signup', 'e56'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '113'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '67c'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '93d'),
            routes: [
              {
                path: '/docs/capstone-project/18.1-build-a-humanoid-simulation',
                component: ComponentCreator('/docs/capstone-project/18.1-build-a-humanoid-simulation', '593'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/capstone-project/18.2-perception-pipeline',
                component: ComponentCreator('/docs/capstone-project/18.2-perception-pipeline', '90f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/capstone-project/18.3-control-pipeline',
                component: ComponentCreator('/docs/capstone-project/18.3-control-pipeline', '507'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/capstone-project/18.4-navigation-pipeline',
                component: ComponentCreator('/docs/capstone-project/18.4-navigation-pipeline', '64b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/capstone-project/18.5-testing',
                component: ComponentCreator('/docs/capstone-project/18.5-testing', '8c0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/capstone-project/18.6-final-report',
                component: ComponentCreator('/docs/capstone-project/18.6-final-report', 'd1e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin-workstation/15.1-hardware-requirements',
                component: ComponentCreator('/docs/digital-twin-workstation/15.1-hardware-requirements', '9ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin-workstation/15.2-gpu-setup',
                component: ComponentCreator('/docs/digital-twin-workstation/15.2-gpu-setup', '068'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin-workstation/15.3-isaac-sim-workstation',
                component: ComponentCreator('/docs/digital-twin-workstation/15.3-isaac-sim-workstation', '742'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin-workstation/15.4-ros-workstation',
                component: ComponentCreator('/docs/digital-twin-workstation/15.4-ros-workstation', '287'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin-workstation/15.5-networking-setup',
                component: ComponentCreator('/docs/digital-twin-workstation/15.5-networking-setup', 'db6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin-workstation/15.6-multi-machine-sync',
                component: ComponentCreator('/docs/digital-twin-workstation/15.6-multi-machine-sync', '4b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations-of-physical-ai/1.1-introduction',
                component: ComponentCreator('/docs/foundations-of-physical-ai/1.1-introduction', 'e64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations-of-physical-ai/embodied-vs-disembodied-intelligence',
                component: ComponentCreator('/docs/foundations-of-physical-ai/embodied-vs-disembodied-intelligence', '1a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations-of-physical-ai/foundations-of-the-course',
                component: ComponentCreator('/docs/foundations-of-physical-ai/foundations-of-the-course', '68b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations-of-physical-ai/key-terminology',
                component: ComponentCreator('/docs/foundations-of-physical-ai/key-terminology', '30e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations-of-physical-ai/real-world-applications',
                component: ComponentCreator('/docs/foundations-of-physical-ai/real-world-applications', '44f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/foundations-of-physical-ai/robotics-ai-convergence',
                component: ComponentCreator('/docs/foundations-of-physical-ai/robotics-ai-convergence', '039'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/full-humanoid-system-architecture/17.1-system-overview',
                component: ComponentCreator('/docs/full-humanoid-system-architecture/17.1-system-overview', 'af3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/full-humanoid-system-architecture/17.2-perception-layer',
                component: ComponentCreator('/docs/full-humanoid-system-architecture/17.2-perception-layer', 'ebe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/full-humanoid-system-architecture/17.3-control-layer',
                component: ComponentCreator('/docs/full-humanoid-system-architecture/17.3-control-layer', '92d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/full-humanoid-system-architecture/17.4-motion-layer',
                component: ComponentCreator('/docs/full-humanoid-system-architecture/17.4-motion-layer', '41e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/full-humanoid-system-architecture/17.5-safety-layer',
                component: ComponentCreator('/docs/full-humanoid-system-architecture/17.5-safety-layer', 'a01'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/full-humanoid-system-architecture/17.6-integration-blueprint',
                component: ComponentCreator('/docs/full-humanoid-system-architecture/17.6-integration-blueprint', 'fc0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/gazebo-simulation/8.1-gazebo-basics',
                component: ComponentCreator('/docs/gazebo-simulation/8.1-gazebo-basics', '88d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/gazebo-simulation/8.2-robot-spawning',
                component: ComponentCreator('/docs/gazebo-simulation/8.2-robot-spawning', 'ac2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/gazebo-simulation/8.3-sensor-simulation',
                component: ComponentCreator('/docs/gazebo-simulation/8.3-sensor-simulation', '4e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/gazebo-simulation/8.4-plugins',
                component: ComponentCreator('/docs/gazebo-simulation/8.4-plugins', '23a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/gazebo-simulation/8.5-ros-gazebo-integration',
                component: ComponentCreator('/docs/gazebo-simulation/8.5-ros-gazebo-integration', 'd52'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/gazebo-simulation/8.6-building-sim-worlds',
                component: ComponentCreator('/docs/gazebo-simulation/8.6-building-sim-worlds', '085'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/glossary-appendix-references/19.1-glossary',
                component: ComponentCreator('/docs/glossary-appendix-references/19.1-glossary', '4fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/glossary-appendix-references/19.2-appendix',
                component: ComponentCreator('/docs/glossary-appendix-references/19.2-appendix', 'd63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/glossary-appendix-references/19.3-references',
                component: ComponentCreator('/docs/glossary-appendix-references/19.3-references', '4e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-locomotion-motion-generation/13.1-biped-motion-basics',
                component: ComponentCreator('/docs/humanoid-locomotion-motion-generation/13.1-biped-motion-basics', '890'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-locomotion-motion-generation/13.2-gait-planning',
                component: ComponentCreator('/docs/humanoid-locomotion-motion-generation/13.2-gait-planning', '44e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-locomotion-motion-generation/13.3-balancing-control',
                component: ComponentCreator('/docs/humanoid-locomotion-motion-generation/13.3-balancing-control', 'c0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-locomotion-motion-generation/13.4-whole-body-movement',
                component: ComponentCreator('/docs/humanoid-locomotion-motion-generation/13.4-whole-body-movement', '8af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-locomotion-motion-generation/13.5-simulation-to-real-transfer',
                component: ComponentCreator('/docs/humanoid-locomotion-motion-generation/13.5-simulation-to-real-transfer', '686'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-locomotion-motion-generation/13.6-safety-and-constraints',
                component: ComponentCreator('/docs/humanoid-locomotion-motion-generation/13.6-safety-and-constraints', '060'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '89a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/isaac-sim-isaac-ros/9.1-isaac-sim-overview',
                component: ComponentCreator('/docs/isaac-sim-isaac-ros/9.1-isaac-sim-overview', '9b1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/isaac-sim-isaac-ros/9.2-ros-bridge',
                component: ComponentCreator('/docs/isaac-sim-isaac-ros/9.2-ros-bridge', '75c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/isaac-sim-isaac-ros/9.3-scene-composition',
                component: ComponentCreator('/docs/isaac-sim-isaac-ros/9.3-scene-composition', '6cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/isaac-sim-isaac-ros/9.4-manipulation-tasks',
                component: ComponentCreator('/docs/isaac-sim-isaac-ros/9.4-manipulation-tasks', '0c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/isaac-sim-isaac-ros/9.5-perception-pipelines',
                component: ComponentCreator('/docs/isaac-sim-isaac-ros/9.5-perception-pipelines', 'f0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/isaac-sim-isaac-ros/9.6-isaac-ros-packages',
                component: ComponentCreator('/docs/isaac-sim-isaac-ros/9.6-isaac-ros-packages', '6b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/jetson-robotics-hardware-setup/16.1-jetson-models',
                component: ComponentCreator('/docs/jetson-robotics-hardware-setup/16.1-jetson-models', '91a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/jetson-robotics-hardware-setup/16.2-flashing-jetson',
                component: ComponentCreator('/docs/jetson-robotics-hardware-setup/16.2-flashing-jetson', 'df8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/jetson-robotics-hardware-setup/16.3-installing-ros2',
                component: ComponentCreator('/docs/jetson-robotics-hardware-setup/16.3-installing-ros2', 'e50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/jetson-robotics-hardware-setup/16.4-sensor-wiring',
                component: ComponentCreator('/docs/jetson-robotics-hardware-setup/16.4-sensor-wiring', 'b60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/jetson-robotics-hardware-setup/16.5-power-management',
                component: ComponentCreator('/docs/jetson-robotics-hardware-setup/16.5-power-management', '6c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/jetson-robotics-hardware-setup/16.6-hardware-calibration',
                component: ComponentCreator('/docs/jetson-robotics-hardware-setup/16.6-hardware-calibration', 'e79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/kinematics-fk-ik-dh/5.1-coordinate-frames',
                component: ComponentCreator('/docs/kinematics-fk-ik-dh/5.1-coordinate-frames', 'a92'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/kinematics-fk-ik-dh/5.2-forward-kinematics',
                component: ComponentCreator('/docs/kinematics-fk-ik-dh/5.2-forward-kinematics', '559'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/kinematics-fk-ik-dh/5.3-inverse-kinematics',
                component: ComponentCreator('/docs/kinematics-fk-ik-dh/5.3-inverse-kinematics', '7cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/kinematics-fk-ik-dh/5.4-dh-parameters',
                component: ComponentCreator('/docs/kinematics-fk-ik-dh/5.4-dh-parameters', 'bd4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/kinematics-fk-ik-dh/5.5-jacobian-concepts',
                component: ComponentCreator('/docs/kinematics-fk-ik-dh/5.5-jacobian-concepts', '6c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/kinematics-fk-ik-dh/5.6-kinematic-chains',
                component: ComponentCreator('/docs/kinematics-fk-ik-dh/5.6-kinematic-chains', 'ca6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/navigation-path-planning-nav2/12.1-nav2-architecture',
                component: ComponentCreator('/docs/navigation-path-planning-nav2/12.1-nav2-architecture', 'b46'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/navigation-path-planning-nav2/12.2-localization',
                component: ComponentCreator('/docs/navigation-path-planning-nav2/12.2-localization', '608'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/navigation-path-planning-nav2/12.3-mapping',
                component: ComponentCreator('/docs/navigation-path-planning-nav2/12.3-mapping', '839'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/navigation-path-planning-nav2/12.4-global-and-local-planning',
                component: ComponentCreator('/docs/navigation-path-planning-nav2/12.4-global-and-local-planning', '67b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/navigation-path-planning-nav2/12.5-costmaps',
                component: ComponentCreator('/docs/navigation-path-planning-nav2/12.5-costmaps', '7a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/navigation-path-planning-nav2/12.6-obstacle-avoidance',
                component: ComponentCreator('/docs/navigation-path-planning-nav2/12.6-obstacle-avoidance', '28f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robot-dynamics-humanoid-control/6.1-mass-torque-force',
                component: ComponentCreator('/docs/robot-dynamics-humanoid-control/6.1-mass-torque-force', 'dd7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robot-dynamics-humanoid-control/6.2-physics-engines',
                component: ComponentCreator('/docs/robot-dynamics-humanoid-control/6.2-physics-engines', 'f2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robot-dynamics-humanoid-control/6.3-stability-and-zmp',
                component: ComponentCreator('/docs/robot-dynamics-humanoid-control/6.3-stability-and-zmp', '24f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robot-dynamics-humanoid-control/6.4-gait-cycle-fundamentals',
                component: ComponentCreator('/docs/robot-dynamics-humanoid-control/6.4-gait-cycle-fundamentals', 'a89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robot-dynamics-humanoid-control/6.5-pd-pid-mpc-controllers',
                component: ComponentCreator('/docs/robot-dynamics-humanoid-control/6.5-pd-pid-mpc-controllers', 'bad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robot-dynamics-humanoid-control/6.6-whole-body-control',
                component: ComponentCreator('/docs/robot-dynamics-humanoid-control/6.6-whole-body-control', '88f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotics-mechatronics-fundamentals/basic-control-theory',
                component: ComponentCreator('/docs/robotics-mechatronics-fundamentals/basic-control-theory', '8da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotics-mechatronics-fundamentals/mechanical-structure-of-robots',
                component: ComponentCreator('/docs/robotics-mechatronics-fundamentals/mechanical-structure-of-robots', 'dda'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotics-mechatronics-fundamentals/motors-actuators-servos',
                component: ComponentCreator('/docs/robotics-mechatronics-fundamentals/motors-actuators-servos', 'dd6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotics-mechatronics-fundamentals/power-systems',
                component: ComponentCreator('/docs/robotics-mechatronics-fundamentals/power-systems', '85e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotics-mechatronics-fundamentals/practical-engineering-concepts',
                component: ComponentCreator('/docs/robotics-mechatronics-fundamentals/practical-engineering-concepts', 'cb1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotics-mechatronics-fundamentals/robotics-taxonomy',
                component: ComponentCreator('/docs/robotics-mechatronics-fundamentals/robotics-taxonomy', 'c6d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2-foundations/3.3-launch-files-and-parameters',
                component: ComponentCreator('/docs/ros2-foundations/3.3-launch-files-and-parameters', 'eaf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2-foundations/3.4-building-ros2-packages',
                component: ComponentCreator('/docs/ros2-foundations/3.4-building-ros2-packages', '458'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2-foundations/3.5-publisher-subscriber-nodes',
                component: ComponentCreator('/docs/ros2-foundations/3.5-publisher-subscriber-nodes', '17c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2-foundations/3.6-ros2-communication-patterns',
                component: ComponentCreator('/docs/ros2-foundations/3.6-ros2-communication-patterns', 'b96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2-foundations/nodes-topics-services',
                component: ComponentCreator('/docs/ros2-foundations/nodes-topics-services', '0b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2-foundations/ros2-architecture',
                component: ComponentCreator('/docs/ros2-foundations/ros2-architecture', 'df3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sensors-perception/7.1-imus',
                component: ComponentCreator('/docs/sensors-perception/7.1-imus', '594'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sensors-perception/7.2-lidar',
                component: ComponentCreator('/docs/sensors-perception/7.2-lidar', '3e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sensors-perception/7.3-rgb-and-depth-cameras',
                component: ComponentCreator('/docs/sensors-perception/7.3-rgb-and-depth-cameras', '472'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sensors-perception/7.4-intel-realsense-setup',
                component: ComponentCreator('/docs/sensors-perception/7.4-intel-realsense-setup', 'c96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sensors-perception/7.5-sensor-fusion',
                component: ComponentCreator('/docs/sensors-perception/7.5-sensor-fusion', 'e8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sensors-perception/7.6-calibration-techniques',
                component: ComponentCreator('/docs/sensors-perception/7.6-calibration-techniques', '080'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/unity-robotics-digital-humans/10.1-unity-robotics-hub',
                component: ComponentCreator('/docs/unity-robotics-digital-humans/10.1-unity-robotics-hub', '25b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/unity-robotics-digital-humans/10.2-unity-ros2-integration',
                component: ComponentCreator('/docs/unity-robotics-digital-humans/10.2-unity-ros2-integration', '479'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/unity-robotics-digital-humans/10.3-character-rigging',
                component: ComponentCreator('/docs/unity-robotics-digital-humans/10.3-character-rigging', 'e6d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/unity-robotics-digital-humans/10.4-motion-retargeting',
                component: ComponentCreator('/docs/unity-robotics-digital-humans/10.4-motion-retargeting', '753'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/unity-robotics-digital-humans/10.5-humanoid-simulation',
                component: ComponentCreator('/docs/unity-robotics-digital-humans/10.5-humanoid-simulation', '2df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/unity-robotics-digital-humans/10.6-reinforcement-learning',
                component: ComponentCreator('/docs/unity-robotics-digital-humans/10.6-reinforcement-learning', '6e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/urdf-robot-description-models/4.1-urdf-basics',
                component: ComponentCreator('/docs/urdf-robot-description-models/4.1-urdf-basics', '39e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/urdf-robot-description-models/4.2-links-and-joints',
                component: ComponentCreator('/docs/urdf-robot-description-models/4.2-links-and-joints', '240'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/urdf-robot-description-models/4.3-xacro-macros',
                component: ComponentCreator('/docs/urdf-robot-description-models/4.3-xacro-macros', '15d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/urdf-robot-description-models/4.4-inertial-and-collision-models',
                component: ComponentCreator('/docs/urdf-robot-description-models/4.4-inertial-and-collision-models', '740'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/urdf-robot-description-models/4.5-visualization-in-rviz',
                component: ComponentCreator('/docs/urdf-robot-description-models/4.5-visualization-in-rviz', '2dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/urdf-robot-description-models/4.6-sdf-and-conversions',
                component: ComponentCreator('/docs/urdf-robot-description-models/4.6-sdf-and-conversions', 'f6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action-robotics/14.1-multimodal-models',
                component: ComponentCreator('/docs/vision-language-action-robotics/14.1-multimodal-models', 'b25'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action-robotics/14.2-clip-and-vla',
                component: ComponentCreator('/docs/vision-language-action-robotics/14.2-clip-and-vla', 'e0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action-robotics/14.3-policy-learning',
                component: ComponentCreator('/docs/vision-language-action-robotics/14.3-policy-learning', '999'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action-robotics/14.4-task-grounding',
                component: ComponentCreator('/docs/vision-language-action-robotics/14.4-task-grounding', 'f45'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action-robotics/14.5-vla-pipelines',
                component: ComponentCreator('/docs/vision-language-action-robotics/14.5-vla-pipelines', 'aff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action-robotics/14.6-real-world-deployment',
                component: ComponentCreator('/docs/vision-language-action-robotics/14.6-real-world-deployment', '1b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/visual-slam-vslam/11.1-slam-principles',
                component: ComponentCreator('/docs/visual-slam-vslam/11.1-slam-principles', '870'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/visual-slam-vslam/11.2-feature-extraction',
                component: ComponentCreator('/docs/visual-slam-vslam/11.2-feature-extraction', '708'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/visual-slam-vslam/11.3-pose-estimation',
                component: ComponentCreator('/docs/visual-slam-vslam/11.3-pose-estimation', '293'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/visual-slam-vslam/11.4-mapping',
                component: ComponentCreator('/docs/visual-slam-vslam/11.4-mapping', '4ec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/visual-slam-vslam/11.5-loop-closure',
                component: ComponentCreator('/docs/visual-slam-vslam/11.5-loop-closure', 'b1a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/visual-slam-vslam/11.6-slam-pipelines',
                component: ComponentCreator('/docs/visual-slam-vslam/11.6-slam-pipelines', '923'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
