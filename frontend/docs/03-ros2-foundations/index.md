---
sidebar_position: 1
title: "ROS 2 Foundations"
---

# ROS 2 Foundations

## Learning Objectives

By the end of this module, you should be able to:

- Explain the architecture of ROS 2 and its core components
- Create and manage ROS 2 nodes for communication
- Implement publisher-subscriber and service communication patterns
- Configure systems using launch files and parameters
- Build ROS 2 packages following best practices
- Understand the differences between ROS 1 and ROS 2

## Overview

The Robot Operating System 2 (ROS 2) is a flexible framework for developing robot applications. Unlike traditional operating systems, ROS 2 provides libraries, tools, and conventions that simplify the development of complex robotic systems. This module introduces the essential concepts and tools needed to develop with ROS 2 effectively.

ROS 2 is designed to support production robotics applications with features like real-time performance, security, and multi-robot systems. It provides a standardized way to structure robot software, manage communication between different components, and reuse existing robot software packages.

## ROS 2 Architecture

ROS 2 has a distributed architecture that allows different components of a robot system to run on different machines. The key architectural elements include:

### Nodes
Nodes are individual processes that perform computation in ROS 2. Each node is designed to perform a specific task and can communicate with other nodes. Examples of nodes include sensor drivers, control algorithms, and user interfaces. Nodes are the fundamental building blocks of any ROS 2 application.

### Packages
Packages are the basic units of code organization in ROS 2. A package contains libraries, executables, scripts, or other files that work together to provide a specific capability. Packages also contain metadata describing dependencies and build instructions.

### Graph
The ROS 2 graph refers to the network of nodes and their connections. The graph is dynamic, changing as nodes start and stop. Tools like ros2 topic, ros2 service, and ros2 node allow you to inspect the graph at runtime.

## Communication Patterns

ROS 2 provides several communication patterns for nodes to exchange information:

### Topics and Publishers/Subscribers
Topics enable asynchronous communication between nodes using a publish-subscribe pattern. Publishers send messages to topics, and subscribers receive messages from topics. Multiple publishers and subscribers can exist for the same topic, enabling flexible system design.

#### Example Use Cases
- Sensor data distribution (e.g., camera images, LIDAR scans)
- Robot state information (e.g., joint positions, odometry)
- Command distribution

### Services
Services provide synchronous request-response communication. A client sends a request to a service server and waits for a response. Services are appropriate for operations that have a clear request-response pattern.

#### Example Use Cases
- Robot calibration
- Navigation goal setting
- Map saving/loading

### Actions
Actions are for long-running tasks that require feedback and the ability to cancel. They extend the service concept with additional capabilities for monitoring progress.

## Launch Files & Parameters

### Launch Files
Launch files are used to start multiple nodes at once with a single command. They specify which nodes to run, their parameters, and their configuration. Launch files are typically written in Python and use the launch package.

### Parameters
Parameters allow configuration values to be set at runtime without recompiling code. Parameters can be set at the node level and accessed programmatically.

## Building ROS 2 Packages

The ROS 2 build system, based on CMake for C++ and ament_python for Python, manages dependencies and compiles code. The standard build command is `colcon build`, which compiles all packages in a workspace.

### Package Structure
A typical ROS 2 package includes:
- `package.xml`: Package metadata and dependencies
- `CMakeLists.txt`: Build instructions for C++ packages
- `setup.py`: Build instructions for Python packages
- `src/`: Source code files
- `include/`: Header files (for C++)
- `launch/`: Launch files
- `config/`: Configuration files

## ROS 2 Communication Patterns in Depth

### Publisher-Subscriber Pattern
The publisher-subscriber pattern is the most common communication pattern in ROS 2. Publishers send data to topics, and subscribers receive data from those topics. This pattern enables:

- Decoupling of nodes
- Multiple consumers of the same data stream
- Asynchronous communication
- Message buffering and queuing

### Quality of Service (QoS)
ROS 2 provides Quality of Service settings that define how messages are handled. QoS settings include:
- Reliability (reliable vs. best-effort)
- Durability (transient-local vs. volatile)
- History (keep-all vs. keep-last)
- Deadline and lifespan constraints

## Practical Considerations

### Performance Optimization
- Minimize message size to reduce network overhead
- Use appropriate QoS settings for your application
- Consider message frequency to avoid network congestion
- Use compression for large data like images

### Security
ROS 2 includes security features for production environments:
- Message encryption and authentication
- Access control
- Secure communication protocols

### Real-time Considerations
For time-critical applications:
- Use real-time safe programming practices
- Configure appropriate real-time scheduling
- Understand timing constraints of your system

## Summary

ROS 2 provides a comprehensive framework for developing robot applications with standardized communication patterns, package management, and tools for debugging and visualization. Understanding these foundational concepts is essential for effective robot software development.

In this module, we've covered the core architecture of ROS 2, the various communication patterns available, and the tools for configuring and building ROS 2 applications. In subsequent modules, we'll dive deeper into specific aspects of ROS 2 as they apply to various robotics problems.