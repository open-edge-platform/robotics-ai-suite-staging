# Demos & Blogs

Demos and blogs collect end-to-end reference applications and tutorials that
show Robotics AI Suite components working together — from sensor bring-up and
simulation to on-robot deployment and AI-driven manipulation. Each entry
includes a detailed description along with instructions for running the sample
on your system.

## Sensors & Perception


::::{grid} 2

:::{grid-item-card} **RealSense Camera with ROS 2**
:link: realsense-ros2
:link-type: doc
:link-alt: clickable cards

Stream RealSense color and depth data through ROS 2 and visualize it in RViz2.
:::

:::{grid-item-card} **3D Pointcloud Groundfloor Segmentation**
:link: pointcloud-groundfloor-segmentation
:link-type: doc
:link-alt: clickable cards

Segment ground surfaces and detect obstacles from 3D point clouds.
:::
::::


## Simulation & Deployment


::::{grid} 2

:::{grid-item-card} **Gazebo Pick & Place Demo**
:link: picknplace
:link-type: doc
:link-alt: clickable cards

Coordinate robot arms and an AMR for a pick-and-place workflow in Gazebo.
:::

:::{grid-item-card} **Simulated Robotics with Gazebo**
:link: basic_sim
:link-type: doc
:link-alt: clickable cards

Simulate a robot as a digital twin in Gazebo before deploying to hardware.
:::

:::{grid-item-card} **Simulating `wandering` in Gazebo**
:link: wandering_sim
:link-type: doc
:link-alt: clickable cards

Simulate the Wandering autonomous exploration pipeline in Gazebo with Nav2.
:::

:::{grid-item-card} **Deploy Robot Teleop Using a Keyboard**
:link: teleop_deploy
:link-type: doc
:link-alt: clickable cards

Validate motor control on a physical robot with keyboard teleoperation.
:::

:::{grid-item-card} **Deploying `wandering`**
:link: wandering_deploy
:link-type: doc
:link-alt: clickable cards

Deploy the Wandering autonomous exploration pipeline on physical hardware.
:::

:::{grid-item-card} **Stationary Arm Vision and Controls Simulation**
:link: rvc_sim
:link-type: doc
:link-alt: clickable cards

Validate the UR5e vision-guided pick-and-place workflow in simulation.
:::

:::{grid-item-card} **Stationary Arm Vision and Controls Deployment**
:link: rvc_deploy
:link-type: doc
:link-alt: clickable cards

Run the UR5e vision-guided pick-and-place workflow on hardware.
:::
::::


## AI Pipelines


::::{grid} 2

:::{grid-item-card} **Model Predictive Control Demo**
:link: mpc_demo
:link-type: doc
:link-alt: clickable cards

Combine ACT imitation learning, OCS2 model predictive control, and MuJoCo simulation.
:::

:::{grid-item-card} **Diffusion Policy**
:link: diffusion_policy
:link-type: doc
:link-alt: clickable cards

Evaluate Transformer- and CNN-based diffusion policies on the Push-T task.
:::

:::{grid-item-card} **VSLAM: ORB-SLAM3**
:link: ORB_VSLAM
:link-type: doc
:link-alt: clickable cards

Run visual and visual-inertial SLAM with RGB-D, stereo, or monocular cameras.
:::

:::{grid-item-card} **LLM Robotics Demo**
:link: llm_robotics
:link-type: doc
:link-alt: clickable cards

Use large-language-model planning and perception in a robotics workflow.
:::

:::{grid-item-card} **Robotics Diffusion Transformer**
:link: robotics_diffusion_transformer
:link-type: doc
:link-alt: clickable cards

Deploy a diffusion-transformer policy for robot manipulation tasks.
:::

:::{grid-item-card} **OpenClaw + AgenticROS Deployment**
:link: openclaw_agenticros_demo
:link-type: doc
:link-alt: clickable cards

Deploy an OpenClaw agent with AgenticROS and an OpenVINO™ Model Server.
:::
::::


## OpenVINO Inference


::::{grid} 2

:::{grid-item-card} **Semantic Segmentation with RealSense**
:link: segmentation_realsense_tutorial
:link-type: doc
:link-alt: clickable cards

Run semantic segmentation on RealSense image data using OpenVINO inference.
:::

:::{grid-item-card} **Object Detection**
:link: object_detection_tutorial
:link-type: doc
:link-alt: clickable cards

Deploy object-detection workloads with ROS 2 camera inputs and OpenVINO acceleration.
:::

:::{grid-item-card} **OpenVINO Multi-Camera Demo**
:link: openvino_multicam_demo
:link-type: doc
:link-alt: clickable cards

Process multiple camera streams in a single OpenVINO-powered demo pipeline.
:::

:::{grid-item-card} **YOLOv8 with OpenVINO**
:link: yolov8_openvino_tutorial
:link-type: doc
:link-alt: clickable cards

Use a YOLOv8 model with OpenVINO for accelerated object detection on robotics systems.
:::
::::



:::{toctree}
:maxdepth: 1
:hidden:

realsense-ros2
pointcloud-groundfloor-segmentation
picknplace
basic_sim
wandering_sim
teleop_deploy
wandering_deploy
rvc_sim
rvc_deploy
mpc_demo
diffusion_policy
ORB_VSLAM
llm_robotics
robotics_diffusion_transformer
openclaw_agenticros_demo
segmentation_realsense_tutorial
object_detection_tutorial
openvino_multicam_demo
yolov8_openvino_tutorial

:::
