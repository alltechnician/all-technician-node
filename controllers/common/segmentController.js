const { asyncHandler, handleServiceCall } = require("../../utils/requestHandler");
const segmentService = require("../../services/common/segmentService");

const createSegment = asyncHandler(async (req, res) => {
  await handleServiceCall(res, segmentService.createSegment, [req.body]);
});

const listSegments = asyncHandler(async (req, res) => {
  await handleServiceCall(res, segmentService.listSegments, []);
});

const getSegmentById = asyncHandler(async (req, res) => {
  await handleServiceCall(res, segmentService.getSegmentById, [req.params.id]);
});

const updateSegment = asyncHandler(async (req, res) => {
  await handleServiceCall(res, segmentService.updateSegment, [req.params.id, req.body]);
});

const deleteSegment = asyncHandler(async (req, res) => {
  await handleServiceCall(res, segmentService.deleteSegment, [req.params.id]);
});

module.exports = { createSegment, listSegments, getSegmentById, updateSegment, deleteSegment };
