import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryQueryDto } from './dto/category-query.dto';
import { PostReviewDto } from './dto/post-review.dto';
import { Review } from './schemas/review.schema';
import { ReviewNormalised, TDate } from './types';

const monthList = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModal: Model<Review>,
  ) {}

  shuffleArray(array: ReviewNormalised[]): ReviewNormalised[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    return shuffledArray;
  }

  dateHandler(): TDate {
    const dayOffset = Math.floor(Math.random() * 30);
    const dateOffset = 24 * 60 * 60 * 1000 * dayOffset;
    const normalised = new Date().getTime() - dateOffset;

    let formatted = 'today';
    if (dayOffset === 1) {
      formatted = 'yesterday';
    }
    if (dayOffset !== 0 && dayOffset !== 1) {
      const messageDate = new Date(normalised);
      const month = monthList[messageDate.getMonth()];
      const day = String(messageDate.getDate()).padStart(2, '0');
      const year = String(messageDate.getFullYear());
      formatted = `${day} ${month} ${year}`;
    }

    return { formatted, normalised };
  }

  async getReview(
    categoryQueryDto: CategoryQueryDto,
  ): Promise<ReviewNormalised[]> {
    const { device, limit } = categoryQueryDto;

    const reviewArray = await this.reviewModal.find({ device });

    const normalisedData: ReviewNormalised[] = reviewArray.map((review) => ({
      id: review._id,
      device: review.device,
      author: review.author,
      rating: review.rating,
      message: review.message,
      date: this.dateHandler(),
      pros: review.pros,
      cons: review.cons,
    }));

    return this.shuffleArray(normalisedData).slice(0, Number(limit));
  }

  async postReview(postReviewDto: PostReviewDto) {
    return await this.reviewModal.create({ ...postReviewDto });
  }

  // uncomment to send all data
  // async postAllReview() {
  //   const array = [...REVIEW_LAPTOP, ...REVIEW_PHONE, ...REVIEW_TABLET];

  //   array.forEach(async (el) => {
  //     await this.reviewModal.create({ ...el });
  //   });

  //   return 'done';
  // }
}
