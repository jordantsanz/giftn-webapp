/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as am4core from '@amcharts/amcharts4/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as am4charts from '@amcharts/amcharts4/charts';
import { updateBudget } from '../actions';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import BudgetTable from './BudgetTable';
import NavBar from './NavBar';
import pink from '../../images/pink.png';

class BudgetHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gauge: false,
      gauge2: false,
      budgetModal: false,
      budget: '',
      percent1: '',
      percent2: '',
      label1: '',
      label2: '',
      total1: '',
      total2: '',
      chart1: '',
      chart2: '',
    };
  }

  componentDidUpdate(oldProps) {
    console.log('oldprops', oldProps);
    if (this.props.user.name != '' && !this.state.gauge && !this.state.gauge2) {
      this.makeGauge(this.props.user.people, this.props.user.budget);
      this.makeGauge2(this.props.user.people, this.props.user.budget);
    }
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
        for (let i = 0; i < peopleList.length; i++) {
          console.log('i', i);
          const { giftInfo } = peopleList[i];
          for (const [key] of Object.entries(giftInfo)) {
            console.log(giftInfo);
            if (giftInfo[key].bought) {
              total += parseInt(giftInfo[key].price, 10);
            }
          }
        }

        console.log(total);

        const chart2 = am4core.create('chartdiv2', am4charts.GaugeChart); // make gauge 2
        const percent = Math.round((total / totalBudget) * 100);
        chart2.innerRadius = am4core.percent(82);
        chart2.data = [{
          value: percent,
          category: '',
          full: 100,
        },
        ];

        console.log('total percent', percent);

        /**
       * Normal axis
       */
        chart2.innerRadius = am4core.percent(80);

        // Set number format
        chart2.numberFormatter.numberFormat = '#.#\'%\'';

        // Create axes
        const categoryAxis = chart2.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'category';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.labels.template.horizontalCenter = 'right';
        categoryAxis.renderer.labels.template.fontWeight = 500;
        categoryAxis.renderer.labels.template.adapter.add('fill', (fill, target) => {
          return (target.dataItem.index >= 0) ? am4core.color('#81D7AD;') : fill;
        });
        categoryAxis.renderer.minGridDistance = 10;

        const valueAxis = chart2.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.disabled = true;

        // Create series
        const series1 = chart2.series.push(new am4charts.RadarColumnSeries());
        series1.dataFields.valueX = 'full';
        series1.dataFields.categoryY = 'category';
        series1.clustered = false;
        series1.columns.template.fill = am4core.color('#0E0B0B');
        series1.columns.template.fillOpacity = 1;
        series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;

        const series2 = chart2.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = 'value';
        series2.dataFields.categoryY = 'category';
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.radarColumn.cornerRadius = 20;

        series2.columns.template.adapter.add('fill', (fill, target) => {
          return am4core.color('#81D7AD');
        });

        const label = chart2.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 45;
        label.x = am4core.percent(50);
        label.y = am4core.percent(100);
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'bottom';
        label.fill = am4core.color('#81D7AD');
        label.text = `$${total}`;
        label.fontFamily = 'Abril Fatface';

        const label2 = chart2.chartContainer.createChild(am4core.Label);
        label2.text = `You’ve spent ${percent}% of 
        your $${totalBudget} budget.`;
        label2.align = 'center';
        label2.fontFamily = 'Josefin Sans';
        label2.fontWeight = 400;
        label2.fontSize = 24;
        label2.width = 100;

        this.chart2 = chart2;

        this.setState({
          gauge2: true,
          chart2,
        });
      }
    };

      makeGauge = (peopleList, totalBudget) => {
        if (!this.state.gauge) {
        // Create chart
          let total = 0;
          for (let i = 0; i < peopleList.length; i++) {
            const { giftInfo } = peopleList[i];
            for (const [key] of Object.entries(giftInfo)) {
              total += parseInt(giftInfo[key].price, 10);
            }
          }

          const chart = am4core.create('chartdiv', am4charts.GaugeChart); // make gauge 1

          console.log('total gauge: ', total);

          const percent = Math.round((total / totalBudget) * 100);

          chart.innerRadius = am4core.percent(82);
          chart.data = [{
            value: percent,
            category: '',
            full: 100,
          },
          ];

          console.log('total percent', percent);

          /**
         * Normal axis
         */
          chart.innerRadius = am4core.percent(80);

          // Set number format
          chart.numberFormatter.numberFormat = '#.#\'%\'';

          // Create axes
          const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = 'category';
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.grid.template.strokeOpacity = 0;
          categoryAxis.renderer.labels.template.horizontalCenter = 'right';
          categoryAxis.renderer.labels.template.fontWeight = 500;
          categoryAxis.renderer.labels.template.adapter.add('fill', (fill, target) => {
            return (target.dataItem.index >= 0) ? am4core.color('#F35849') : fill;
          });
          categoryAxis.renderer.minGridDistance = 10;

          const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.grid.template.strokeOpacity = 0;
          valueAxis.min = 0;
          valueAxis.max = 100;
          valueAxis.renderer.labels.template.disabled = true;
          valueAxis.strictMinMax = true;

          // Create series
          const series1 = chart.series.push(new am4charts.RadarColumnSeries());
          series1.dataFields.valueX = 'full';
          series1.dataFields.categoryY = 'category';
          series1.clustered = false;
          series1.columns.template.fill = am4core.color('#0E0B0B');
          series1.columns.template.fillOpacity = 1;
          series1.columns.template.cornerRadiusTopLeft = 20;
          series1.columns.template.strokeWidth = 0;
          series1.columns.template.radarColumn.cornerRadius = 20;

          const series2 = chart.series.push(new am4charts.RadarColumnSeries());
          series2.dataFields.valueX = 'value';
          series2.dataFields.categoryY = 'category';
          series2.clustered = false;
          series2.columns.template.strokeWidth = 0;
          series2.columns.template.radarColumn.cornerRadius = 20;

          series2.columns.template.adapter.add('fill', (fill, target) => {
            return am4core.color('#F35849');
          });

          const label = chart.radarContainer.createChild(am4core.Label);
          label.isMeasured = false;
          label.fontSize = 45;
          // label.x = am4core.percent(10);
          // label.y = am4core.percent(100);
          label.horizontalCenter = 'middle';
          label.verticalCenter = 'bottom';
          label.fill = am4core.color('#F35849');
          label.text = `$${total}`;
          label.fontFamily = 'Abril Fatface';

          const label2 = chart.chartContainer.createChild(am4core.Label);
          label2.text = `You’ve planned ${percent}% 
          of your $${totalBudget} budget.`;
          label2.align = 'center';
          label2.fontFamily = 'Josefin Sans';
          label2.fontWeight = 400;
          label2.fontSize = 24;
          label2.width = 100;

          this.chart3 = chart;

          this.setState({
            gauge: true,
            chart,
          });
        }
      };

      reload = () => {
        // calculates ones that are already bought
        let total = 0;
        for (let i = 0; i < this.props.user.people.length; i++) {
          const { giftInfo } = this.props.user.people[i];
          for (const [key] of Object.entries(giftInfo)) {
            console.log(giftInfo);
            if (giftInfo[key].bought) {
              total += parseInt(giftInfo[key].price, 10);
            }
          }
        }
        const percent = Math.round((total / this.props.user.budget) * 100);
        this.state.chart2.innerRadius = am4core.percent(82);
        this.state.chart2.data = [{
          value: percent,
          category: '',
          full: 100,
        },
        ];

        this.state.chart2.radarContainer.children.values[5].text = `$${total}`;
        this.state.chart2.chartContainer.children.values[3].text = `You’ve spent ${percent}% 
        of your $${this.props.user.budget} budget.`;

        // calculates the entire total
        let total2 = 0;
        for (let j = 0; j < this.props.user.people.length; j++) {
          const giftInfo2 = this.props.user.people[j].giftInfo;
          for (const [key] of Object.entries(giftInfo2)) {
            total2 += parseInt(giftInfo2[key].price, 10);
          }
        }
        const percent2 = Math.round((total2 / this.props.user.budget) * 100);
        this.state.chart.data = [{
          value: percent2,
          category: '',
          full: 100,
        },
        ];
        this.state.chart.validateData();
        this.state.chart.radarContainer.children.values[5].text = `$${total2}`;
        this.state.chart.chartContainer.children.values[3].text = `You’ve planned ${percent2}% 
        of your $${this.props.user.budget} budget.`;
        console.log('reloaded!');
      }

      openBudgetModal = () => {
        this.setState({
          budgetModal: true,
        });
      }

      closeBudgetModal = () => {
        this.setState({
          budgetModal: false,
        });
      }

      submitBudget = () => {
        if (parseInt(this.state.budget, 10) > 0) {
          this.props.updateBudget(this.props.user, this.state.budget);
          this.setState({
            budget: '',
          });
        }
        this.closeBudgetModal();
      }

      grabBudget = (e) => {
        this.setState({
          budget: e.target.value,
        });
      }

      render() {
        return (
          <div className="background">
            <img src={pink} alt="background" className="homepage-outer" />
            <NavBar />
            <div className="budget-section">
              <h1 className="title">Budget</h1>
              <div className="gauge-holders">
                <div className="chartdiv" id="chartdiv" />
                <div className="chartdiv2" id="chartdiv2" />
              </div>
            </div>
            <div className="edit-budget-section">
              <button className="edit-budget" type="button" onClick={this.openBudgetModal}>Edit budget</button>
            </div>
            <Modal
              isOpen={this.state.budgetModal}
            // onAfterOpen={afterOpenModal}
              onRequestClose={this.closeBudgetModal}
              className="Modal modal budget-modal"
              overlay="overlay"
              contentLabel="Add a Tracking Number"
            >
              <div className="modal-top">
                <FontAwesomeIcon className="modal-x" id="yellow-x" role="button" onClick={this.closeBudgetModal} icon={faTimes} />
              </div>
              <div className="title-pink-modal">Edit Budget</div>
              <div className="subtitle-modal-budget">Edit your holiday spending budget.</div>
              <div className="adding-person-section">
                <div className="budget-box">
                  <div className="budget-dollar-sign">$</div>
                  <input autoComplete="off" className="budget-input" id="budget-input" onChange={this.grabBudget} placeholder="1000" />
                </div>
                <button type="button" className="button-adding-budget" onClick={this.submitBudget}> Update my budget </button>
              </div>
            </Modal>
            <div className="gift-section">
              <h1 className="title">Gift List</h1>
              <BudgetTable people={this.props.user.people} reload={this.reload} />
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

export default connect(mapStateToProps, { updateBudget })(BudgetHub);
