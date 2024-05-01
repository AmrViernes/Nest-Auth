import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  //@UseGuards(AuthGuard)
  @Serialize(ReportDto)
  create(@Body() createReportDto: CreateReportDto, @CurrentUser() user: UserEntity) {
    return this.reportsService.create(createReportDto, user);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('/estimate')
  getEstimate(@Query() query: GetEstimateDto){
    return this.reportsService.createEstimate(query)
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() approveReportDto: ApproveReportDto) {
    return this.reportsService.approveReport(id, approveReportDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
