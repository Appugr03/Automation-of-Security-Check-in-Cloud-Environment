<img width="1607" height="1012" alt="image" src="https://github.com/user-attachments/assets/cef5ebe0-d36a-410c-b15c-d249749802b9" /># Zero Trust Dashboard
Zero Trust Security Dashboard – Security Overview
The Security Overview page serves as the central hub for real-time monitoring of cloud infrastructure using Zero Trust principles. It displays a dynamic Security Metrics Dashboard with a current Security Score (e.g., 85%) representing the overall security posture of the system. The interface also shows trends and improvements compared to previous assessments (e.g., "+2% vs last week").
The sidebar provides quick access to key modules such as:
Services – Microservice insights
Network – Network traffic and segmentation
Threats – Detected anomalies or risks
Access Control – Role and permission enforcement
Monitoring & Activity – User and system logs
Users – Identity-based access tracking
The sleek, dark-themed UI with real-time status indicators (e.g., “System Secure”) enhances clarity and usability for security analysts and admins.
A real-time dashboard for monitoring microservices security in a Zero Trust architecture.

<img width="1382" height="880" alt="image" src="https://github.com/user-attachments/assets/12baa90c-5093-4996-9f34-664de4f2d496" />
Global Cyber Threat Monitor – Dashboard Overview
The Global Cyber Threat Monitor provides a real-time visual representation of cyber threat activity across different regions. It highlights:

🔥 462 Active Threats currently being tracked

🚨 3 Critical Alerts indicating high-severity issues

🌍 8 Affected Regions across the globe

The heatmap visually clusters threat zones based on severity, with color-coded intensity:

🔴 Red: High-threat regions (e.g., 120, 95 threats)

🟠 Orange/Yellow: Moderate to low-level threat clusters

🟡 Yellow: Low-threat or emerging activity


<img width="775" height="411" alt="image" src="https://github.com/user-attachments/assets/dd147293-beb4-43bc-9fa0-11bcd40d5d35" />
Network Topology – Service Connectivity & Security View
The Network Topology panel provides a clear visual map of microservices and their interconnections, offering instant visibility into the security health of each service node and the communication paths between them.

🔍 Key Highlights:
Services: 6 total microservices are displayed:

✅ Secure: Auth Service, Notification Service, API Gateway, User Service

⚠️ Warning: Payment Service

❌ Critical: Analytics Service

Connections: 7 direct communication paths (edges) between services, showing the data flow and interaction routes.

Secure Links: Out of 7, 4 links are marked as secure (green), indicating safe communication paths.

Critical Issues: 1 major vulnerability identified — the Analytics Service is marked as Critical, likely due to a misconfiguration, vulnerability, or exposure.

🧠 Legend:
Green = Secure

Yellow = Warning

Red = Critical



<img width="725" height="478" alt="image" src="https://github.com/user-attachments/assets/a22c89ca-908e-4181-a312-7cc888538c53" />

Microservices – Individual Security & Performance Metrics
This dashboard presents a comparative overview of multiple microservices, focusing on their security posture, trust score, and operational metrics. Each service card is color-coded based on its status: ✅ Secure, ⚠️ Warning, or ❌ Critical.

🔍 Key Panels:
✅ Authentication Service
ID: SRV-001

Trust Score: 95% — Excellent

Status: Secure

Requests/hour: 12,450

Active Threats: 0

Last Verified: 2 mins ago

This service is operating optimally with no active threats and a high trust score, indicating strong authentication mechanisms and secure implementation.

⚠️ Payment Gateway
ID: SRV-002

Trust Score: 78% — Good

Status: Warning

Requests/hour: 8,900

Active Threats: 2

Last Verified: 5 mins ago

This service has a moderate trust score with some vulnerability indicators. It requires attention to prevent potential risks from escalating.

❌ User Database
ID: SRV-003

Trust Score: 45% — Poor

Status: Critical

Requests/hour: 15,600

Active Threats: 7

Last Verified: 15 mins ago

This is the most at-risk component, with a low trust score, high traffic volume, and several active threats. Immediate remediation is required.

<img width="1412" height="897" alt="image" src="https://github.com/user-attachments/assets/7a206435-549e-41f3-8cb5-351c8ced02eb" />
Left Panel: Recent Access Requests
This section displays the latest access attempts by users, including risk levels and the nature of the access.

jane.smith@company.com

Risk Level: 🟠 Medium

Time: 10:25:00

Accessing: User Database

Permission Type: WRITE

admin@company.com

Risk Level: 🟢 Low

Time: 10:20:00

Accessing: System Configuration

Permission Type: ADMIN

guest@company.com

Risk Level: 🔴 High (marked with warning icons)

Time: 10:15:00

Accessing: Analytics Dashboard

Permission Type: READ

👥 Right Panel: Active User Sessions
This section shows currently active user sessions along with device and location details, session time, and risk levels.

john.doe@company.com

Device: MacBook Pro

Location: New York, US

Session Time: 09:00:00

Status: ✅ Active

Risk Level: 🟢 Low

jane.smith@company.com

Device: Windows Laptop

Location: London, UK

Session Time: 08:30:00

Status: ✅ Active

Risk Level: 🟠 Medium

admin@company.com

Device: iPad

Location: San Francisco, US

Session Time: 07:45:00

Status: ✅ Active

Risk Level: 🔘 Not shown clearly, but likely LOW based on previous pattern

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build



