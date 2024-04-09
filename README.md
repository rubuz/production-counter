![Screenshot of page](https://i.postimg.cc/3R8TQpZv/image001.png)
![Screenshot of page](https://i.postimg.cc/SRx0hpw7/graphs.png)

# Production Counter

The Production Counter Webapp is designed to be displayed on screens in the production lines of the automobile (caravaning) industry. It interfaces with an API connected to the ERP system of a company to retrieve real-time production data. The website showcases the current number of finished products and the number of planned products on a daily and monthly basis. Additionally, it provides a user-friendly interface with a sidemenu for selecting different production lines. It also includes graphical visualization of the production data.

## Features

- Real-time display of finished and planned product counts.
- Daily and monthly production statistics.
- Graphical visualization of production data.
- Sidemenu for selecting different production lines.
- Animated number counters for a dynamic user experience.

## Tech stack

ReactJS + Tailwind

## Project Structure

The main entry point of the application is *src/main.jsx*. The **App.jsx** file is the main component that wraps all other components. The Graphs directory contains components for displaying daily and monthly production statistics. The **Counter.jsx** and **SumCounter.jsx** components are used to display the number of finished and planned products. The **SideMenu.jsx** component is used for the sidemenu functionality. The **GraphInfo.jsx** component is used for graphical visualization of the production data.

## Key Components

### Counter
This component fetches and displays the production data for a specific production line. It uses the fetchData function to retrieve the data from the API and stores it in the data state variable. The useEffect hook is used to fetch the data when the component mounts and at regular intervals thereafter.

### SumCounter
This component fetches and displays the total production data across all production lines. It uses the fetchDataForAllLines function to retrieve the data from the API and stores it in the totalData state variable. The useEffect hook is used to fetch the data when the component mounts and at regular intervals thereafter.

### Graphs
This component is responsible for displaying the graphical representation of the production data. It fetches the data from the API and uses a library (like D3.js or Chart.js) to render the data as a graph. The useEffect hook is used to fetch the data when the component mounts and at regular intervals thereafter. The component also handles user interactions like hovering over a data point to display more detailed information.

### SideMenu
This component provides the sidemenu functionality. It allows the user to select different production lines.

