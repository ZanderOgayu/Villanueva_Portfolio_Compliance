---
title: "Ubuntu Linux System Administration & Infrastructure Lab"
operationCode: "OP-02 // SYSAD-TELEMETRY"
tagline: "Comprehensive Linux server administration experiments covering storage management, bash scripting, and user permission controls"
category: "System Administration"
techStack: ["Ubuntu Linux", "Bash / Shell Scripting", "Storage Management", "CLI Administration", "WMIC"]
clearanceLevel: "LEVEL 4 [ELEVATED]"
featured: true
coverImage: "/System_Admin_Documentation/Experiment2/Config1.png"
order: 2
---

## 1. Mission Briefing
A comprehensive series of 4 intensive system administration laboratory experiments and activities executed on Ubuntu Linux and Windows CLI environments. The project covers foundational UNIX principles, advanced shell scripting, storage partition management, package repository maintenance, and user authentication policies.

## 2. Experimental Modules Executed

### Module 01: Host Hardware & Architecture Telemetry
* System diagnostics using Windows Management Instrumentation Command-line (`wmic`) and CPU-Z to document RAM topology, core thread allocation, and memory timings.
* Cross-referencing physical silicon configurations against manufacturer datasheets.

![WMIC Hardware Diagnostics](/System_Admin_Documentation/part%202%20proof%20wmic.png)
*Fig 1.1: Automated WMIC hardware audit and memory slot mapping.*

![CPU-Z Architecture Telemetry](/System_Admin_Documentation/part%203%20proof%20-%20memory%20cpu%20z.png)
*Fig 1.2: CPU-Z memory timing analysis and SPD bus telemetry verification.*

### Module 02: Linux Storage & Filesystem Architecture
* Configured logical block devices, directory permission masks (`ls -l`, `chmod`, `chown`), and user context switches (`whoami`, `su`).
* Administered partition formatting, mounting workflows, and storage quota enforcement.

![Linux Permission Masking](/System_Admin_Documentation/Experiment2/ls%20-l.png)
*Fig 2.1: File permission matrix and ownership delegation in bash.*

![Configuration Summary](/System_Admin_Documentation/Experiment2/SummaryConfig.png)
*Fig 2.2: Terminal summary configuration and storage mounting audit.*

### Module 03: Shell Scripting & Automated Diagnostics
* Authored custom Bash scripts for automated health checks, disk utilization alerts (`df -h`), and memory monitoring (`free -m`).
* Utilized cron automation to trigger scheduled maintenance scripts and system logs.

![Automated Shell Scripting](/System_Admin_Documentation/Experiment3/sysadexp3.1.png)
*Fig 3.1: Interactive bash diagnostic utility and memory utilization alerts.*

![Script Execution Trace](/System_Admin_Documentation/Experiment3/sysadexp3.2.png)
*Fig 3.2: Automated shell execution logs and error recovery pipeline.*

### Module 04: Server Package Storage & Repository Configuration
* Managed package caches via `apt` and `dpkg`, configured custom PPA mirrors, resolved broken dependency trees, and secured root account privileges through `sudoers` editing (`visudo`).

![Package Management Pipeline](/System_Admin_Documentation/Experiment4/sysadexp4.1.png)
*Fig 4.1: Debian/Ubuntu package repository indexing and dependency resolution.*
