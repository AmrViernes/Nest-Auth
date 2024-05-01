import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>,
  ) {}

  create(createReportDto: CreateReportDto, user: UserEntity) {
    const report = this.repo.create(createReportDto);
    report.user = user;
    return this.repo.save(report);
  }

  createEstimate(estimateDTO: GetEstimateDto) {
    return this.repo.createQueryBuilder()
    .select('*')
    .where('make = :make', {make: estimateDTO.make})
    .getRawMany()
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: string, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  async approveReport(id: string, approveReportDto: ApproveReportDto) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    report.approved = approveReportDto.approved;
    return this.repo.save(report);
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
