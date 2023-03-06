import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryQueryDto } from './dto/category-query.dto';
import { PostReviewDto } from './dto/post-review.dto';
import { ReviewService } from './review.service';
import { ReviewNormalised } from './types';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReview(
    @Query() categoryQueryDto: CategoryQueryDto,
  ): Promise<ReviewNormalised[]> {
    return this.reviewService.getReview(categoryQueryDto);
  }

  @Post()
  async postReview(@Body() postReviewDto: PostReviewDto) {
    return this.reviewService.postReview(postReviewDto);
  }
}
