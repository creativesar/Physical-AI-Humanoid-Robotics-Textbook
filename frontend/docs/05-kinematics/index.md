---
sidebar_position: 1
title: "Kinematics (FK, IK, DH)"
---

# Kinematics (Forward Kinematics, Inverse Kinematics, Denavit-Hartenberg)

## Learning Objectives

By the end of this module, you should be able to:

- Define coordinate frames and transformations in robotic systems
- Calculate forward kinematics for serial manipulators
- Solve inverse kinematics problems for common robot configurations
- Apply the Denavit-Hartenberg (DH) convention for kinematic modeling
- Compute Jacobian matrices and understand their applications
- Analyze kinematic chains including serial and parallel mechanisms

## Overview

Robot kinematics is the study of motion in robotic systems, focusing on the relationship between joint variables and the position and orientation of the robot's end-effector. This module covers three fundamental aspects of robotics kinematics: forward kinematics (computing end-effector position from joint angles), inverse kinematics (computing joint angles from end-effector position), and the Denavit-Hartenberg convention (a systematic method for modeling robot kinematics).

Kinematics forms the foundation for robot control, motion planning, and trajectory generation. Understanding these concepts is essential for designing, programming, and controlling robotic systems. Whether you're working with industrial manipulators, mobile robots, or humanoid systems, kinematic analysis is a crucial skill.

## Coordinate Frames

### Reference Frames in Robotics
A coordinate frame is a system that defines the position and orientation of objects in space. In robotics, we use multiple coordinate frames:

- **World Frame**: Global reference frame for the robot's environment
- **Base Frame**: Fixed frame attached to the robot's base
- **End-effector Frame**: Frame attached to the robot's tool or end-effector
- **Joint Frames**: Frames attached to each joint of the robot

### Homogeneous Transformations
Homogeneous transformations are 4x4 matrices that combine rotation and translation in a single representation:

```
T = [ R  p ]
    [ 0  1 ]
```

Where R is a 3x3 rotation matrix and p is a 3x1 position vector. These transformations allow us to convert points from one coordinate frame to another.

### Rotation Matrices
Rotation matrices represent orientation in 3D space. Common representations include:
- Euler angles (roll-pitch-yaw, ZYX, etc.)
- Axis-angle representation
- Quaternions (for avoiding gimbal lock)

## Forward Kinematics

Forward kinematics (FK) is the process of calculating the position and orientation of the robot's end-effector given the joint angles. This is a well-defined problem with a unique solution.

### Mathematical Foundation
For a robot with n joints, the forward kinematics can be expressed as:
```
T = T1(θ1) * T2(θ2) * ... * Tn(θn)
```

Where Ti(θi) represents the transformation matrix for the i-th joint.

### Practical Implementation
- Each joint contributes a transformation based on its type and angle
- For revolute joints: rotation around the joint axis
- For prismatic joints: translation along the joint axis
- The cumulative transformation gives the end-effector pose

## Inverse Kinematics

Inverse kinematics (IK) is the process of determining the joint angles required to place the end-effector at a desired position and orientation. This is generally a more challenging problem than forward kinematics because:

- Multiple solutions may exist (redundant robots)
- Solutions may not exist (out of reach)
- Multiple solution techniques are applicable
- Computational complexity is higher

### Analytical Solutions
For simple robot configurations, closed-form analytical solutions may exist:
- Planar 2R manipulator: solvable using geometric methods
- 6-DOF anthropomorphic manipulator: Pieper's solution
- Special geometric arrangements

### Numerical Solutions
For complex robots, iterative numerical methods are used:
- Jacobian-based methods (pseudo-inverse, transpose)
- Optimization-based approaches
- Geometric solvers

## Denavit-Hartenberg (DH) Parameters

The Denavit-Hartenberg convention is a systematic method for defining coordinate frames on robot links and joints. It's particularly useful for modeling serial manipulators.

### DH Parameters
Each joint-link pair is characterized by four parameters:
- **a_i** (link length): Distance along x_i from z_(i-1) to z_i
- **α_i** (link twist): Angle from z_(i-1) to z_i about x_i
- **d_i** (link offset): Distance along z_(i-1) from x_(i-1) to x_i
- **θ_i** (joint angle): Angle from x_(i-1) to x_i about z_(i-1)

*(Note: subscripts and parenthetical indices indicate array/matrix notation)*

### Frame Assignment Rules
1. The z-axis is the joint axis
2. The x-axis is along the common normal between consecutive z-axes
3. The y-axis completes the right-handed coordinate system

### Transformation Matrix
Using DH parameters, the transformation from frame (i-1) to frame (i) is:

```
T_(i-1->i) = Rot(z, theta_i) * Trans(z, d_i) * Trans(x, a_i) * Rot(x, alpha_i)
```

## Jacobian Concepts

The Jacobian matrix relates joint velocities to end-effector velocities:
```math
v = J(q) * q̇
```

Where:
- v is the end-effector velocity vector [linear velocity; angular velocity]
- J(q) is the Jacobian matrix
- q̇ is the vector of joint velocities

### Applications
- Velocity kinematics
- Force and torque analysis
- Singularity analysis
- Differential motion control

### Types of Jacobians
- **Geometric Jacobian**: Relates joint velocities to end-effector twist
- **Analytical Jacobian**: Includes orientation representation derivatives

### Singularities
Singularities occur when the Jacobian loses rank, meaning the robot loses one or more degrees of freedom. At singularities:
- Inverse kinematics is ill-conditioned
- Infinite joint velocities would be required for certain end-effector motions
- Robot control becomes difficult

## Kinematic Chains

### Serial Mechanisms
In serial mechanisms, links are connected end-to-end like a chain. Most industrial manipulators are serial mechanisms with the following characteristics:
- Simple kinematic structure
- Large workspace
- Lower stiffness compared to parallel mechanisms

### Parallel Mechanisms
In parallel mechanisms, multiple kinematic chains connect the base to the end-effector. Examples include Stewart platforms and delta robots:
- Higher stiffness
- Better accuracy
- More complex kinematics
- Smaller workspace

## Practical Considerations

### Implementation Challenges
- Numerical accuracy in long kinematic chains
- Handling of multiple solutions in IK
- Singularity avoidance
- Joint limit constraints

### Software Tools
- ROS MoveIt! for motion planning with kinematic solvers
- KDL (Kinematics and Dynamics Library)
- Analytical solutions for specific robot configurations

### Validation
- Forward kinematics verification
- Inverse kinematics accuracy testing
- Jacobian computation verification
- Singularity detection

## Summary

Robot kinematics provides the mathematical foundation for understanding and controlling robot motion. Mastering forward kinematics, inverse kinematics, and the DH convention is essential for robot programming and control. Understanding these concepts enables precise positioning, trajectory planning, and effective robot operation.

This module has covered the fundamental concepts of robot kinematics, from basic coordinate transformations to advanced inverse kinematics techniques. As we continue through the course, these kinematic principles will be applied in more complex robotic systems and control scenarios.