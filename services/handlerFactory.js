const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndRemove(id);
    if (!document) {
      return next(
        new ApiError(` ${model} with id: ${id} is not existed for `, 404)
      );
    }
    res.status(204).send();
  });
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(` ${Model} is not updated for id: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ date: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    // if (Model === "Product") {
    //   document.populate({
    //     path: "category",
    //     select: "name -_id",
    //   });
    // }
    if (!document) {
      return next(new ApiError(`no ${Model} for this id`));
    }
    res.status(200).json({ date: document });
  });
