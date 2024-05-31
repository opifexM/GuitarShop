import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum';
import { GuitarType } from 'shared/type/product/guitar-type.enum';

@Schema({
  collection: 'products',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: { virtuals: true },
})
export class ProductModel extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true })
  postedAt: Date;

  @Prop({ required: true, trim: true })
  photoId: string;

  @Prop({ required: true, enum: GuitarType })
  guitarType: GuitarType;

  @Prop({ required: true, trim: true })
  article: string;

  @Prop({ required: true, enum: GuitarStringType })
  guitarStringType: GuitarStringType;

  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);

ProductSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
