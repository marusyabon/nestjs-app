import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chart } from './chart.model';

@Injectable()
export class ChartsService {
  constructor(
      @InjectModel('Chart') private readonly chartModel: Model<Chart>
    ) {}

  async getCharts() {
    const charts = await this.chartModel.find().exec();
    return charts as Chart[];
  }

  async insertChart(name: string, userIds: Array<string>) {
    const newChart = await new this.chartModel({name, userIds});
    const result = await newChart.save();
    return result._id as string;
  }
}