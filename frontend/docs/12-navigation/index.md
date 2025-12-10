---
sidebar_position: 1
title: "Navigation (Nav2)"
---

# Navigation (Nav2)

## Learning Objectives

By the end of this module, you should be able to:

- Understand the architecture and components of the ROS 2 Navigation system (Nav2)
- Implement robot localization in known maps using sensor data
- Create accurate maps of unknown environments for navigation
- Design global and local path planning strategies for robot navigation
- Configure and use costmaps for obstacle representation and navigation
- Implement obstacle avoidance algorithms for dynamic environments

## Overview

Navigation is a fundamental capability for mobile robots, enabling them to autonomously move from one location to another. ROS 2 Navigation (Nav2) is the latest generation of navigation tools for ROS, designed to provide robust, flexible, and reliable navigation for mobile robots. Nav2 represents a complete rewrite of the original ROS Navigation stack with improved architecture, performance, and capabilities.

Nav2 addresses the complex problem of mobile robot navigation by integrating multiple components including localization, mapping, path planning, and control. This module covers the essential components of the Nav2 system, from understanding its architecture to configuring and implementing navigation systems for various robotic platforms.

Navigation systems face numerous challenges including dynamic environments, sensor noise, localization uncertainty, and computational constraints. Modern navigation systems must balance accuracy, safety, efficiency, and robustness while adapting to changing conditions in real-time.

## Nav2 Architecture

### System Overview
Nav2 follows a modular, component-based architecture with clearly defined interfaces:

- **Navigation Server**: Central orchestrator for navigation behaviors
- **Lifecycle Nodes**: Managed nodes with explicit states (unconfigured, inactive, active)
- **Action Servers**: Interface with clients using ROS 2 actions
- **Pluggable Components**: Swappable algorithms for different capabilities

### Core Components

**Behavior Tree Implementation**
- **Action Nodes**: Execute specific navigation tasks
- **Condition Nodes**: Evaluate conditions in the environment
- **Decorator Nodes**: Modify behavior of other nodes
- **Control Nodes**: Organize execution flow

**Navigation Server Tasks**
- NavigateToPose: Navigate to a goal pose
- NavigateThroughPoses: Navigate through a series of waypoints
- ComputePathToPose: Plan a path to a goal
- ComputePathThroughPoses: Plan a path through waypoints
- FollowPath: Execute a path with obstacle avoidance

### Configuration System
- **YAML Configuration**: Modular configuration files
- **Parameter Server**: Dynamic parameter updates
- **Plugins**: Algorithm selection through plugin interface
- **Namespacing**: Support for multi-robot systems

## Localization

### Concepts and Importance
Localization is the process of determining a robot's position and orientation in a known map. In Nav2, localization is typically handled by the AMCL (Adaptive Monte Carlo Localization) node:

- **Particle Filter**: Maintains a distribution of possible robot poses
- **Sensor Integration**: Uses LiDAR, odometry, and other sensors
- **Map Matching**: Compares sensor data to known map
- **Pose Estimation**: Provides best estimate of robot pose

### AMCL (Adaptive Monte Carlo Localization)
- **Particle Representation**: Robot pose distribution as set of particles
- **Motion Model**: Predict particle movement based on odometry
- **Sensor Model**: Update particle weights based on sensor data
- **Resampling**: Maintain diverse set of high-probability particles

### Localization Challenges
- **Sensor Noise**: Uncertainty in sensor measurements
- **Odometry Drift**: Accumulated errors in motion estimation
- **Dynamic Environments**: Moving objects in static maps
- **Initial Pose Estimation**: Finding robot position when starting

### Alternative Localization Methods
- **Scan Matching**: Align current scan to map directly
- **Vision-based Localization**: Using cameras and visual features
- **Fiducial Markers**: Using known markers for localization
- **Multi-sensor Fusion**: Combining multiple localization sources

## Mapping

### Simultaneous Localization and Mapping (SLAM)
Mapping in Nav2 often involves creating maps during navigation or exploration:

- **SLAM Integration**: Tools for creating maps (slam_toolbox)
- **Map Server**: Stores and provides static maps
- **Map Updates**: Dynamic updates to static maps
- **Multi-session Mapping**: Combining maps from multiple sessions

### SLAM Toolbox
The slam_toolbox package provides SLAM capabilities:
- **Online SLAM**: Create map while robot moves
- **Incremental Mapping**: Add to existing maps
- **Pose Graph Optimization**: Optimize map consistency
- **Re-localization**: Find position in existing map

### Map Representation
- **Occupancy Grids**: 2D representation with obstacle probabilities
- **Resolution**: Trade-off between detail and computational cost
- **Map Updates**: Dynamic updates to map based on sensor data
- **Map Compression**: Efficient storage of large maps

### Mapping Best Practices
- **Sensor Selection**: Appropriate sensors for environment
- **Coverage Strategy**: Systematic exploration for complete mapping
- **Quality Assessment**: Evaluate map quality before navigation
- **Validation**: Compare with ground truth when available

## Global and Local Planning

### Global Planning
Global planners create a path from start to goal using the static map:

**A* Algorithm**
- **Optimal Path**: Finds shortest path considering costs
- **Heuristic Function**: Estimates distance to goal
- **Cost Function**: Considers obstacles and terrain

**Dijkstra's Algorithm**
- **Uniform Cost**: Explores equally in all directions
- **Guaranteed Optimality**: Finds optimal path

**NavFn Algorithm**
- **Gradient-based**: Computes potential field and follows gradient
- **Multi-goal**: Handles multiple goals efficiently

### Local Planning
Local planners execute the global path while avoiding dynamic obstacles:

**Dynamic Window Approach (DWA)**
- **Dynamic Constraints**: Consider robot dynamics
- **Velocity Sampling**: Evaluate possible velocities
- **Collision Prediction**: Avoid dynamic obstacles

**Trajectory Rollout**
- **Predictive**: Evaluate future trajectories
- **Obstacle Avoidance**: React to immediate obstacles
- **Smooth Motion**: Generate smooth, feasible paths

### Planner Configuration
- **Cost Functions**: Define path quality metrics
- **Inflation Radius**: Expand obstacle areas for safety
- **Planning Frequency**: Balance responsiveness with computation
- **Path Optimization**: Improve path quality post-planning

## Costmaps

### Concept and Purpose
Costmaps represent the environment with different cost values:
- **Obstacle Layer**: Static and dynamic obstacles
- **Inflation Layer**: Safety margin around obstacles
- **Voxel Layer**: 3D obstacle representation
- **Other Layers**: Custom information (slope, terrain, etc.)

### Costmap Structure
- **2.5D Representation**: 2D grid with height information
- **Cost Values**: 
  - 0: Free space
  - 1-98: Increasing cost (e.g., proximity to obstacles)
  - 99: Potential obstacles
  - 100: Lethal obstacles
  - 255: Unknown space

### Costmap Layers
- **Static Layer**: Loads from map server
- **Obstacle Layer**: Processes sensor data
- **Voxel Layer**: Maintains 3D obstacle information
- **Inflation Layer**: Creates safety buffer
- **Range Sensor Layer**: Processes ultrasonic/IR sensors

### Configuration Parameters
- **Resolution**: Size of each cell (meters)
- **Update Frequency**: How often costmap updates
- **Size**: Width and height in meters
- **Origin**: Center of costmap relative to robot

## Obstacle Avoidance

### Types of Obstacles
- **Static**: Permanent obstacles in environment
- **Dynamic**: Moving obstacles that change position
- **Temporary**: Obstacles that appear/disappear
- **Partial**: Obstacles partially visible to sensors

### Obstacle Detection and Tracking
- **Clustering**: Group sensor readings into obstacles
- **Tracking**: Associate obstacles across time
- **Prediction**: Estimate future positions of dynamic obstacles
- **Classification**: Identify obstacle types when possible

### Avoidance Strategies
- **Velocity Obstacle**: Compute forbidden velocity ranges
- **Reciprocal Velocity Obstacle (RVO)**: Multi-agent collision avoidance
- **Potential Fields**: Attractive and repulsive forces
- **Optimization-based**: Formulate avoidance as optimization problem

### Safety Considerations
- **Reactive vs. Predictive**: Balance immediate and future safety
- **Conservative vs. Aggressive**: Balance safety and efficiency
- **Dynamic Window**: Consider robot's stopping capability
- **Emergency Stopping**: Stop when avoidance fails

## Practical Implementation

### Nav2 Launch System
Nav2 uses a modular launch system:
- **Individual Components**: Launch specific nodes as needed
- **Complete System**: Launch all navigation components
- **Parameter Files**: Configure behavior through parameters
- **Lifecycle Management**: Properly manage node lifecycles

### Parameter Configuration
Key parameters for navigation performance:
- **Costmap Parameters**: Resolution, update frequency, inflation
- **Planner Parameters**: Tolerance, frequency, optimization
- **Controller Parameters**: Look-ahead distance, velocity limits
- **Safety Parameters**: Emergency thresholds, velocity limits

### Common Issues and Solutions
- **Localization Problems**: Check odometry, sensor data, map quality
- **Planning Failures**: Verify map, costmap configuration, robot radius
- **Oscillation**: Adjust controller parameters, look-ahead distance
- **Safety**: Ensure proper safety limits and emergency behaviors

### Performance Optimization
- **Compute Resources**: Balance performance with computational load
- **Sensor Integration**: Optimize sensor data processing
- **Parameter Tuning**: Optimize parameters for specific robot/platform
- **Testing**: Validate navigation in varied environments

## Integration with Robotics Stacks

### Hardware Integration
- **Sensor Configuration**: Integrate LiDAR, cameras, IMUs
- **Control Interface**: Connect to robot's drive system
- **Calibration**: Ensure accurate sensor and robot models
- **Safety Systems**: Integrate emergency stops and safety systems

### Multi-Robot Navigation
- **Coordination**: Avoid collisions between robots
- **Path Planning**: Consider other robots as dynamic obstacles
- **Communication**: Share map and intent information
- **Resource Management**: Coordinate access to common areas

## Summary

Navigation is a critical capability for mobile robots, enabling autonomous operation in unknown and dynamic environments. Nav2 provides a powerful, flexible framework for implementing navigation systems with modern ROS 2 architecture and best practices.

This module has covered the fundamental components of Nav2, from localization and mapping to planning and obstacle avoidance. Understanding these concepts is essential for implementing effective robot navigation systems.

As we progress through the course, the navigation concepts learned here will be applied in contexts requiring autonomous operation, multi-robot coordination, and integration with perception systems.