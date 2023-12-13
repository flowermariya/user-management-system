import mongoose from "mongoose";

const baseSchemaFields = {
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
};

const BaseSchema = new mongoose.Schema(baseSchemaFields, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

export { BaseSchema, baseSchemaFields };
