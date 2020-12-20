/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import BudgetTable from './BudgetTable';
import NavBar from './NavBar';

class BudgetHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gauge: false,
      gauge2: false,
    };
  }

  componentDidMount() {
    this.makeGauge(this.props.user.people, this.props.user.budget);
    this.makeGauge2(this.props.user.people, this.props.user.budget);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.chart2) {
      this.chart2.dispose();
    }
  }

    makeGauge2 = (peopleList, totalBudget) => {
      if (!this.state.gauge) {
        // Create chart
        let total = 0;
        console.log(total);
        for (let i = 0; i < peopleList.length; i++) {
          console.log('i', i);
          const { giftInfo } = peopleList[i];
          for (let j = 0; j < giftInfo.length; j++) {
            if (giftInfo[j].bought) {
              total += giftInfo[j].price;
            }
          }
        }

        console.log(total);

        const percent = Math.round((total / totalBudget) * 100);
        const chart = am4core.create('chartdiv2', am4charts.GaugeChart);
        chart.innerRadius = am4core.percent(82);

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
        axis.renderer.labels.template.radius = 30;
        axis.renderer.labels.template.fontSize = 10;
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
        label.fontSize = 15;
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
        title.fontSize = 15;
        title.marginTop = 30;
        title.fontFamily = 'Roboto';
        title.fill = '#000000';
        title.padding(10, 10, 10, 10);

        const label2 = chart.chartContainer.createChild(am4core.Label);
        label2.text = '*Percentage of unique websites visited that are green';
        label2.align = 'right';

        this.chart2 = chart;

        this.setState({
          gauge2: true,
        });
      }
    };

      makeGauge = (peopleList, totalBudget) => {
        if (!this.state.gauge) {
        // Create chart
          let total = 0;
          for (let i = 0; i < peopleList.length; i++) {
            console.log('i', i);
            const { giftInfo } = peopleList[i];
            for (let j = 0; j < giftInfo.length; j++) {
              total += giftInfo[j].price;
            }
          }

          console.log(total);

          const percent = Math.round((total / totalBudget) * 100);
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
          axis.renderer.labels.template.radius = 30;
          axis.renderer.labels.template.fontSize = 10;
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
          label.fontSize = 15;
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
          title.fontSize = 10;
          title.marginTop = 30;
          title.fontFamily = 'Roboto';
          title.fill = '#000000';
          title.padding(10, 10, 10, 10);

          const label2 = chart.chartContainer.createChild(am4core.Label);
          label2.text = '*Percentage of unique websites visited that are green';
          label2.align = 'right';

          this.chart3 = chart;

          this.setState({
            gauge: true,
          });
        }
      };

      render() {
        return (
          <div className="homepage-outer">
            <NavBar />
            <div className="budget-section">
              <h1 className="title">Budget</h1>
              <div className="gauge-holders">
                <div className="chartdiv" id="chartdiv" />
                <div className="chartdiv2" id="chartdiv2" />
              </div>
            </div>
            <div className="gift-section">
              <h1 className="title">Gift List</h1>
              <BudgetTable people={this.props.user.people} />
            </div>
          </div>
        );
      }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
  };
}

export default connect(mapStateToProps, null)(BudgetHub);
