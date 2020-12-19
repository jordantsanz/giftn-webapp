/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Login from './Login';
import Logout from './Logout';
import Table from './Table';

// function createData(person, total, giftInfo) {
//   return {
//     person,
//     total,
//     giftInfo,
//   };
// }
// const rows = [
//   createData('Wylie', 159, [{ giftName: 'dildo', price: 69.96 }]),
//   createData('Jordan', 159, [{ giftName: 'dildo', price: 69.96 }]),
//   createData('Sathvi', 159, [{ giftName: 'dildo', price: 69.96 }]),
//   createData('Catherine', 159, [{ giftName: 'dildo', price: 69.96 }]),
// ];

const people = [
  {
    name: 'Wylie',
    giftInfo: [
      {
        giftName: 'Dildo',
        price: 20,
      },
    ],
  },
  {
    name: 'Jordan',
    giftInfo: [
      {
        giftName: 'your mom',
        price: 2000,
      },
    ],
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gauge: false,
    };
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

    checkLog = () => {
      if (this.props.name != '') {
        return (
          <Logout />
        );
      } else {
        return (
          <Login />
        );
      }
    }

      makeGauge = (peopleList, totalBudget) => {
        const thePeople = [
          {
            name: 'Wylie',
            giftInfo: [
              {
                giftName: 'Dildo',
                price: 20,
              },
            ],
          },
          {
            name: 'Jordan',
            giftInfo: [
              {
                giftName: 'your mom',
                price: 2000,
              },
            ],
          },
        ];
        if (!this.state.gauge) {
        // Create chart
          let total = 0;
          for (let i = 0; i < thePeople.length; i++) {
            console.log('i', i);
            const { giftInfo } = thePeople[i];
            for (let j = 0; j < giftInfo.length; j++) {
              total += giftInfo[j].price;
            }
          }

          console.log(total);

          const percent = Math.round((total / 3000) * 100);
          const chart = am4core.create('chartdiv', am4charts.GaugeChart);
          chart.innerRadius = am4core.percent(82);

          console.log(percent);

          /**
         * Normal axis
         */

          const axis = chart.xAxes.push(new am4charts.ValueAxis());
          axis.min = 0;
          axis.max = 100;
          axis.strictMinMax = true;
          axis.renderer.radius = am4core.percent(80);
          axis.renderer.inside = true;
          axis.renderer.line.strokeOpacity = 1;
          axis.renderer.ticks.template.disabled = false;
          axis.renderer.ticks.template.strokeOpacity = 1;
          axis.renderer.ticks.template.length = 10;
          axis.renderer.grid.template.disabled = true;
          axis.renderer.labels.template.radius = 60;
          axis.renderer.labels.template.adapter.add('text', (text) => {
            return `${text}%`;
          });

          /**
         * Axis for ranges
         */

          // eslint-disable-next-line no-unused-vars
          const colorSet = new am4core.ColorSet();

          const axis2 = chart.xAxes.push(new am4charts.ValueAxis());
          axis2.min = 0;
          axis2.max = 100;
          axis2.strictMinMax = true;
          axis2.renderer.labels.template.disabled = true;
          axis2.renderer.ticks.template.disabled = true;
          axis2.renderer.grid.template.disabled = true;

          const range0 = axis2.axisRanges.create();
          range0.value = 0;
          range0.endValue = 50;
          range0.axisFill.fillOpacity = 1;
          range0.axisFill.fill = am4core.color('#00FF19');

          const range1 = axis2.axisRanges.create();
          range1.value = 50;
          range1.endValue = 100;
          range1.axisFill.fillOpacity = 1;
          range1.axisFill.fill = am4core.color('#7000FF');

          /**
         * Label
         */
          const hand = chart.hands.push(new am4charts.ClockHand());
          hand.axis = axis2;
          hand.innerRadius = am4core.percent(25);
          hand.startWidth = 10;
          hand.pin.disabled = true;
          hand.value = percent;

          const label = chart.radarContainer.createChild(am4core.Label);
          label.isMeasured = false;
          label.fontSize = 45;
          label.x = am4core.percent(50);
          label.y = am4core.percent(100);
          label.horizontalCenter = 'middle';
          label.verticalCenter = 'bottom';
          label.text = `${hand.value}%`;

          /**
         * Hand
         */

          hand.events.on('propertychanged', (ev) => {
            range0.endValue = ev.target.value;
            range1.value = ev.target.value;
            label.text = `${axis2.positionToValue(hand.currentPosition).toFixed(1)}%`;
            axis2.invalidate();
          });

          const title = chart.titles.create();
          title.text = 'Budget Spent';
          title.marginBottom = 30;
          title.fontSize = 25;
          title.marginTop = 30;
          title.fontFamily = 'Roboto';
          title.fill = '#000000';
          title.padding(10, 10, 10, 10);

          const label2 = chart.chartContainer.createChild(am4core.Label);
          label2.text = '*Percentage of unique websites visited that are green';
          label2.align = 'right';

          this.chart2 = chart;

          this.setState({
            gauge: true,
          });
        }
      };

      render() {
        this.makeGauge(people, 3000);
        return (
          <div className="homepage-outer">
            <div className="hello">Hello!</div>
            <div className="chartdiv" id="chartdiv" />
            <Table people={people} />
            {this.checkLog()}
          </div>
        );
      }
}

function mapStateToProps(reduxState) {
  return {
    name: reduxState.user.name,
  };
}

export default connect(mapStateToProps, null)(Home);
