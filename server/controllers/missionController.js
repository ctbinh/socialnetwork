const Follow = require("../models/followModel");
const Mission = require("../models/missionModel");
const Article = require("../models/articleModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllMyMission = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username });
  if (`${req.user._id}` !== `${user._id}`) {
    return next(new AppError("You are not allowed to view this field", 403));
  }
  const missions = await Mission.find();
  const data = await Promise.all(
    missions.map(async (mission) => {
      const schemaTarget =
        mission.schemaName === "User"
          ? User
          : mission.schemaName === "Follow"
          ? Follow
          : mission.schemaName === "Article"
          ? Article
          : null;
      let data = [];
      const condition = mission.condition.map((item) => {
        if (item.typeCond === "eq") {
          return {
            $eq: [
              `$${item.field}`,
              item.value === "userId" ? req.user._id : item.value,
            ],
          };
        } else if (item.typeCond === "gte") {
          return {
            $gte: [
              item.fieldIsArray
                ? { $size: `$${item.field}` }
                : `$${item.field}`,
              item.value === "userId" ? req.user._id : item.value,
            ],
          };
        }
      });
      data = await schemaTarget.find({
        $expr: {
          $and: [...condition],
        },
      });
      if (data.length > mission.expected) {
        mission.achieved = mission.expected;
      } else {
        mission.achieved = data.length;
      }
      if (req.user.missionCollected.includes(mission._id)) {
        mission.collected = true;
      }
      return mission;
    })
  );
  res.status(200).json({
    status: "success",
    data: {
      missions: data,
    },
  });
});

exports.createMission = catchAsync(async (req, res, next) => {
  const newMission = await Mission.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      mission: newMission,
    },
  });
});

exports.claimReward = catchAsync(async (req, res, next) => {
  let reward = {
    $push: {},
  };
  console.log(req.body.reward);
  if (req.body.reward.name !== "Exp") {
    reward.$push.badges = "Verified";
  } else {
    reward.$inc = {
      curExp: req.body.reward.value,
    };
  }
  reward.$push.missionCollected = req.body._id;
  const user = await User.findByIdAndUpdate(req.user._id, reward, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { user },
  });
});
