import {
  Controller,
  Get,
  Post,
  Body
} from '@nestjs/common';

import { ChartsService } from './charts.service';

@Controller('charts')
  export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get()
  getAllCharts() {
    return this.chartsService.getCharts();
  }

  @Post()
  async addChart(
    @Body('name') chartName: string,
    @Body('userIds') userIds: [string]
  ) {
    const generatedId = await this.chartsService.insertChart(
      chartName,
      userIds
    )
    return { id: generatedId };
  }
}