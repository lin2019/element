/**
 * Series 构建器基类
 * 负责构建不同类型图表的 series 配置
 */

export class SeriesBuilder {
  constructor(config, baseConfig, gradientColorFn) {
    this.config = config;
    this.baseConfig = baseConfig;
    this.createGradientColor = gradientColorFn;
  }

  /**
   * 获取柱状图宽度
   */
  getBarWidth() {
    return this.config.barWidth || this.baseConfig.barWidth;
  }

  /**
   * 获取系列名称
   */
  getSeriesName(index) {
    return (this.config.legendNames && this.config.legendNames[index]) || `类型${index + 1}`;
  }

  /**
   * 获取系列数据
   */
  getSeriesData(index) {
    if (this.config.data && this.config.data.series) {
      return (this.config.data.series[index] && this.config.data.series[index].data) || [];
    }
    return [];
  }

  /**
   * 获取数据系列数量
   */
  getDataCount() {
    if (this.config.data && this.config.data.series) {
      return this.config.data.series.length;
    }
    return this.config.dataCount || this.baseConfig.dataCount || 1;
  }

  /**
   * 创建基础 label 配置
   */
  createLabelConfig(position = 'top') {
    return {
      show: false,
      position,
      color: '#262626',
      fontSize: 16,
      fontWeight: 'bold'
    };
  }

  /**
   * 应用 showValue 配置
   */
  applyShowValue(series) {
    if (this.config.showValue) {
      series.forEach((item, index) => {
        item.label.show = true;
      });
    }
    return series;
  }

  /**
   * 构建 series（由子类实现）
   */
  build() {
    throw new Error('SeriesBuilder.build() must be implemented by subclass');
  }
}

/**
 * 基础柱状图 Series 构建器
 */
export class BaseBarSeriesBuilder extends SeriesBuilder {
  build() {
    const seriesList = [];
    const count = this.getDataCount();

    for (let i = 0; i < count; i++) {
      seriesList.push({
        type: 'bar',
        barWidth: this.getBarWidth(),
        label: this.createLabelConfig('top'),
        data: this.getSeriesData(i),
        name: this.getSeriesName(i),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: this.createGradientColor(i)
        }
      });
    }

    return this.applyShowValue(seriesList);
  }
}

/**
 * 堆叠柱状图 Series 构建器
 */
export class StackBarSeriesBuilder extends SeriesBuilder {
  build() {
    const seriesList = [];
    const count = this.getDataCount();

    for (let i = 0; i < count; i++) {
      seriesList.push({
        type: 'bar',
        barWidth: this.getBarWidth(),
        stack: 'total',
        label: this.createLabelConfig('top'),
        data: this.getSeriesData(i),
        name: this.getSeriesName(i),
        itemStyle: {
          borderRadius: i === (count - 1) ? [4, 4, 0, 0] : [0, 0, 0, 0],
          color: this.createGradientColor(i)
        }
      });
    }

    // 堆叠图只在最后一个系列显示总值
    if (this.config.showValue && seriesList.length > 0) {
      const lastIndex = seriesList.length - 1;
      seriesList[lastIndex].label.show = true;
      seriesList[lastIndex].label.formatter = (params) => {
        return this.calculateTotalData(params, seriesList);
      };
    }

    return seriesList;
  }

  /**
   * 计算堆叠总数据
   */
  calculateTotalData(params, series) {
    let total = 0;
    for (let i = 0; i < series.length; i++) {
      total += series[i].data[params.dataIndex] || 0;
    }
    return total;
  }
}

/**
 * 双向柱状图 Series 构建器
 */
export class BidirectionalBarSeriesBuilder extends SeriesBuilder {
  build() {
    const seriesList = [];
    const count = this.getDataCount();

    for (let i = 0; i < count; i++) {
      const isEven = (i + 1) % 2 === 0;

      seriesList.push({
        type: 'bar',
        barWidth: this.getBarWidth(),
        stack: 'total',
        label: this.createLabelConfig(isEven ? 'bottom' : 'top'),
        data: this.getSeriesData(i),
        name: this.getSeriesName(i),
        itemStyle: {
          borderRadius: isEven ? [0, 0, 4, 4] : [4, 4, 0, 0],
          color: this.createGradientColor(i)
        }
      });
    }

    // 双向图需要在奇偶序列都显示数值
    if (this.config.showValue) {
      seriesList.forEach((item, index) => {
        item.label.show = true;
        item.label.formatter = (params) => {
          return this.calculateTotalData(params, seriesList);
        };
      });
    }

    return seriesList;
  }

  calculateTotalData(params, series) {
    let total = 0;
    for (let i = 0; i < series.length; i++) {
      total += series[i].data[params.dataIndex] || 0;
    }
    return total;
  }
}

/**
 * 锥形柱状图 Series 构建器
 */
export class TaperBarSeriesBuilder extends SeriesBuilder {
  build() {
    const seriesList = [];
    const count = this.getDataCount();

    for (let i = 0; i < count; i++) {
      const data = this.getSeriesData(i);
      const maxNum = Math.max(...data);

      seriesList.push({
        type: 'pictorialBar',
        symbol: this.config.symbol || this.baseConfig.symbol,
        barWidth: this.getBarWidth(),
        label: this.createLabelConfig('top'),
        barGap: '-50%',
        data: data,
        name: this.getSeriesName(i),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: (param) => {
            return this.createGradientColor(i, param, maxNum);
          }
        }
      });
    }

    return this.applyShowValue(seriesList);
  }
}

/**
 * 折柱图 Series 构建器
 */
export class BarLineSeriesBuilder extends SeriesBuilder {
  build() {
    const seriesList = [];

    // 柱状图部分
    seriesList.push({
      type: 'bar',
      barWidth: this.getBarWidth(),
      label: this.createLabelConfig('top'),
      data: this.getSeriesData(0),
      name: this.getSeriesName(0),
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: this.createGradientColor(0)
      }
    });

    // 折线图部分
    seriesList.push({
      type: 'line',
      smooth: true,
      label: this.createLabelConfig('top'),
      data: this.getSeriesData(1),
      name: this.getSeriesName(1),
      itemStyle: {
        color: this.baseConfig.colors[1]
      }
    });

    // 折柱图两个系列都显示数值
    if (this.config.showValue) {
      seriesList.forEach(item => {
        item.label.show = true;
      });
    }

    return seriesList;
  }
}

/**
 * 立体柱状图 Series 构建器
 */
export class ThreeDBarSeriesBuilder extends SeriesBuilder {
  constructor(config, baseConfig, gradientColorFn, colors3D) {
    super(config, baseConfig, gradientColorFn);
    this.colors3D = colors3D;
  }

  build() {
    const barWidth = this.getBarWidth();
    const data = this.getSeriesData(0);

    return [
      // 柱底圆片
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [barWidth, 8],
        symbolOffset: [0, 4],
        z: 12,
        itemStyle: {
          color: (params) => this.create3DGradientColor(params.dataIndex, 'bottom')
        },
        data: data
      },
      // 柱体
      {
        name: this.getSeriesName(0),
        type: 'bar',
        barWidth: barWidth,
        barGap: '0%',
        itemStyle: {
          color: (params) => this.create3DGradientColor(params.dataIndex, 'body')
        },
        data: data
      },
      // 柱顶圆片
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [barWidth, 8],
        symbolOffset: [0, -4],
        z: 12,
        symbolPosition: 'end',
        itemStyle: {
          color: (params) => this.create3DGradientColor(params.dataIndex, 'top')
        },
        data: data
      }
    ];
  }

  /**
   * 创建立体图渐变色
   */
  create3DGradientColor(index, position) {
    const colorIndex = this.config.mlColor3d ? index : 0;
    const normalizedIndex = colorIndex >= this.colors3D.length
      ? colorIndex - this.colors3D.length
      : colorIndex;

    if (position === 'top') {
      return this.colors3D[normalizedIndex][2];
    }

    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        { offset: 0, color: this.colors3D[normalizedIndex][0] },
        { offset: 1, color: this.colors3D[normalizedIndex][1] }
      ]
    };
  }
}

