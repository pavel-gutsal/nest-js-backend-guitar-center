import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { CategoryQueryDto } from './dto/category-query.dto';
import { PostReviewDto } from './dto/post-review.dto';
import { ReviewService } from './review.service';
import { ReviewNormalised } from './types';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'get reviews as per query flags' })
  @ApiResponse({ status: 200, type: [ReviewNormalised] })
  async getReview(
    @Query() categoryQueryDto: CategoryQueryDto,
  ): Promise<ReviewNormalised[]> {
    return this.reviewService.getReview(categoryQueryDto);
  }

  @Post()
  @ApiOperation({ summary: 'post individual review' })
  async postReview(@Body() postReviewDto: PostReviewDto) {
    return this.reviewService.postReview(postReviewDto);
  }
}
