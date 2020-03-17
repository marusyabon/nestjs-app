import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChartsController } from './charts.controller';
import { ChartsService } from './charts.service';
import { ChartSchema } from './chart.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chart', schema: ChartSchema }])],
  controllers: [ChartsController],
  providers: [ChartsService],
})
export class ChartsModule {}