function methods(model, schema) {

    schema.options.toJSON = {
        transform: function(doc, ret, options) {

            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;

            return ret;
        }
    }

    schema.find = function(query) {
        return new Promise((resolve, reject) => {
            model.find(query, function(err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    };

    schema.findOne = function(query, options = {}) {
        return new Promise((resolve, reject) => {
            model.findOne(query, '', options, function(err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    };

    schema.count = function() {
        return model.count();
    }

    schema.create = function (data) {
        if (data instanceof Array) {
            // USUALLY ONLY HAPPENS WHEN SETTING UP INITIAL DATA
            // other cases aren't handled because it's just a demo
            return model.insertMany(data);
        }
        const object = new model(data);
        return object.save();
    };

    schema.update = function(id, update) {
        return model.findByIdAndUpdate(id, update, { new: true, returnDocument: 'after' });
    };

    schema.delete = function(query) {
        return model.deleteMany(query);
    };
}

module.exports = methods;