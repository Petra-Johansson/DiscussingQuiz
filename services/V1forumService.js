const Forumpost = require("../models/forumModel");

module.exports = class ForumService {
  static async createForumpost(body) {
    if ( body.title && body.text) {
      const data = body;

      const forumpost = new Forumpost({
        title: data.title,
        text: data.text,
      });

      await forumpost.save();
      return forumpost;
    } else {
      return { error: "Fields can not be left blank" };
    }
  }

  static getForumposts() {
    return Forumpost.find();
  }

  static getForumpost(id) {
    return Forumpost.findOne({ _id: id });
  }

  static async updateForumpost(id, body) {
    try {
      const forumpost = await Forumpost.findOne({ _id: id });
      if (forumpost) {
        if (body.text) {
          forumpost.text = body.text;
        }
        if (body.title) {
          forumpost.title = body.title;
        } if(body.category) {
          forumpost.category = body.category;
        }
        await forumpost.save();
      }
      return forumpost;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteForumpost(id) {
    try {
      await Forumpost.findByIdAndDelete({_id: id});
      return { status: 204 };
    } catch (error) {
      return { error: "Forumpost could not be found" };
    }
  }
};
