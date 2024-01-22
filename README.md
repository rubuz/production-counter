# Production Counter

The Production Counter Website is designed to be displayed on screens in the production lines of the automobile (caravaning) industry. It interfaces with an API connected to the ERP system of a company to retrieve real-time production data. The website showcases the current number of finished products and the number of planned products on a daily and monthly basis. Additionally, it provides a user-friendly interface with a sidemenu for selecting different production lines, and it supports both dark and light themes. It also includes graphical visualization of the production data.

## Features

- Real-time display of finished and planned product counts.
- Daily and monthly production statistics.
- Graphical visualization of production data.
- Sidemenu for selecting different production lines.
- Dark and light theme options for user preference.
- Color-coded indicators based on production progress.
- Animated number counters for a dynamic user experience.
- Progress bars to visually represent production progress.

## Project Structure

The project is structured as a React application with the main entry point in `src/main.jsx`. The `App.jsx` file is the main component that wraps all other components. The `Graphs` directory contains components for displaying daily and monthly production statistics. The `Counter.jsx` and `SumCounter.jsx` components are used to display the number of finished and planned products. The `SideMenu.jsx` component is used for the sidemenu functionality. The `GraphInfo.jsx` component is used for graphical visualization of the production data.

## Usage

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rubuz/production-counter.git
   cd production-counter
