---
sidebar_position: 1
title: "URDF & Robot Description Models"
---

# URDF & Robot Description Models

## Learning Objectives

By the end of this module, you should be able to:

- Define Unified Robot Description Format (URDF) and its purpose
- Create complete robot models with links, joints, and properties
- Use XACRO macros to simplify complex robot descriptions
- Define inertial and collision models for physics simulation
- Visualize robot models in RViz and simulation environments
- Convert between URDF and other robot description formats

## Overview

The Unified Robot Description Format (URDF) is an XML-based format used to describe robots in ROS. It enables standardization of robot models across various tools including simulation, visualization, and control frameworks. This module covers the fundamentals of creating accurate robot descriptions that can be used for simulation, planning, and control tasks.

URDF models contain information about the physical properties of a robot, including kinematic structure, visual appearance, collision properties, and inertial properties. These models are essential for simulation environments like Gazebo and visualization tools like RViz, and they're used by motion planning algorithms to understand robot capabilities and constraints.

## URDF Basics

### Structure of URDF Files
URDF files are XML documents that describe robot structure through:
- **Links**: Rigid parts of the robot
- **Joints**: Connections between links that allow relative motion
- **Visual elements**: How the robot appears in visualization
- **Collision elements**: How the robot interacts with the environment in simulation
- **Inertial elements**: Physics properties for simulation
- **Materials**: Visual appearance properties

### Links
Links represent rigid bodies in the robot. Each link has:
- A unique name
- Visual properties (shape, material, origin)
- Collision properties (shape, origin)
- Inertial properties (mass, center of mass, inertia matrix)

Links can have multiple visual and collision elements to represent different aspects of their geometry.

### Joints
Joints connect links and define the allowed motion between them. Joint types include:
- **Fixed**: No motion allowed (rigid connection)
- **Revolute**: Single axis rotation, limited to a range
- **Continuous**: Single axis rotation, unlimited
- **Prismatic**: Single axis translation, limited
- **Floating**: Six degrees of freedom (no constraints)
- **Planar**: Motion constrained to a plane

Each joint specifies:
- Joint name and type
- Parent and child links
- Joint origin (position and orientation relative to parent)
- Axis of motion (for revolute and prismatic joints)
- Limits (for revolute and prismatic joints)

## XACRO Macros

XACRO (XML Macros) is an XML macro language that extends URDF with features like:
- Variables and constants
- Mathematical expressions
- Macros for reusable components
- File inclusion

### Benefits of XACRO
- Reduces redundancy in large robot descriptions
- Enables parameterization of robot models
- Simplifies maintenance of complex robots
- Improves readability of robot descriptions

### Common XACRO Constructs
- `$(arg ...)` - Access command-line arguments
- `$(find package_name)` - Find package paths
- `<xacro:property>` - Define constants and variables
- `<xacro:macro>` - Define reusable components
- `<xacro:include>` - Include other XACRO files

## Inertial & Collision Models

### Inertial Properties
Inertial models define the mass distribution of robot links, which is critical for:
- Physics simulation accuracy
- Control algorithm performance
- Dynamic analysis

Inertial properties include:
- Mass (scalar value)
- Center of mass (xyz coordinates in link frame)
- Inertia matrix (3x3 matrix describing rotational inertia)

### Collision Models
Collision models define how robot parts interact with the environment during simulation:
- Shape (box, cylinder, sphere, mesh)
- Origin (position and orientation relative to link frame)
- Size parameters (for geometric shapes)

Collision models should be simpler than visual models for computational efficiency. Convex hulls or primitive shapes are often used instead of complex meshes.

### Visual Models
Visual models define how the robot appears in visualization tools:
- Shape, material, and texture information
- Origin and scale parameters
- Similar to collision models but can be more detailed

## Visualization in RViz

RViz is ROS's 3D visualization tool that can display URDF robot models:
- RobotModel plugin displays the robot structure
- JointState publisher provides joint values for visualization
- TF (Transform) frames show the kinematic relationships
- Interactive markers can be used to control joint values

### Best Practices for Visualization
- Ensure all required joint states are published
- Use appropriate TF frame names
- Verify that visual and collision models align properly
- Include appropriate materials for visual appeal

## SDF & Conversions

### SDF (Simulation Description Format)
SDF is Gazebo's native robot description format with features:
- More comprehensive physics modeling
- Advanced joint types
- Sensor descriptions
- World and model databases

### Converting Between Formats
- URDF can be converted to SDF for Gazebo simulation
- Tools like urdf2sdf facilitate conversion
- Some information may be lost during conversion
- Validation is important after conversion

## Practical Examples

### Simple Robot Model
A basic robot with a base link and a single rotating joint:
```xml
<robot name="simple_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.5 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <joint name="base_to_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="wheel"/>
    <origin xyz="0 0 -0.05" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>

  <link name="wheel">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1"/>
      </material>
    </visual>
  </link>
</robot>
```

## Quality Assurance

### Validation Tools
- `check_urdf` command validates URDF syntax
- `urdf_to_graphiz` generates a visual representation of the kinematic tree
- Simulation testing verifies completeness and correctness

### Common Issues
- Missing joint limits for revolute joints
- Inconsistent mass properties
- Mismatched visual and collision models
- Incorrect kinematic chain definition

## Summary

URDF and XACRO are essential tools for describing robots in ROS-based applications. Understanding how to create accurate and efficient robot descriptions is critical for successful robotics development. Good URDF models enable accurate simulation, effective visualization, and proper motion planning.

This module has introduced the key concepts of robot description formats, from basic URDF structure to advanced XACRO features. As we progress through the course, we'll see how these robot models are used in simulation, control, and perception systems.