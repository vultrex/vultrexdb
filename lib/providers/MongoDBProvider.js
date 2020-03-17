"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoDBProvider {
    constructor(options) {
        this.initialized = false;
        this.url = options.url;
        this.collectionName = options.collection || "Vultrex";
    }
    async init() {
        this.client = new mongodb_1.MongoClient(this.url, { useUnifiedTopology: true });
        await this.client.connect();
        this.db = this.client.db();
        this.collection = this.db.collection(this.collectionName);
        this.initialized = true;
    }
    async set(key, value) {
        this.collection.updateOne({ _id: key }, { $set: { _id: key, value } }, { upsert: true });
    }
    async get(key, defaultValue) {
        const data = await this.collection.findOne({ _id: key });
        const result = data["value"];
        return result !== null ? result : defaultValue;
    }
    async getAll() {
        const data = await this.collection.find({}).toArray();
        return data.map(data => ({ key: data["_id"], value: data["value"] }));
    }
    async size() {
        return this.collection.countDocuments();
    }
    async delete(key) {
        this.collection.deleteOne({ _id: key });
    }
    async clear() {
        this.collection.drop();
    }
}
exports.MongoDBProvider = MongoDBProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uZ29EQlByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVycy9Nb25nb0RCUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0Q7QUFJdEQsTUFBYSxlQUFlO0lBVzNCLFlBQW1CLE9BQStCO1FBRjNDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBR25DLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDO0lBQ3ZELENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0RSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQW9CLEVBQUUsS0FBVTtRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFJLEdBQW9CLEVBQUUsWUFBaUI7UUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixPQUFPLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQ2hELENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNsQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFvQjtRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRDtBQW5ERCwwQ0FtREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nb0NsaWVudCwgRGIsIENvbGxlY3Rpb24gfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IHsgTW9uZ29EQlByb3ZpZGVyT3B0aW9ucyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL01vbmdvREJQcm92aWRlck9wdGlvbnNcIjtcbmltcG9ydCB7IFJvd0RhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9Sb3dEYXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBNb25nb0RCUHJvdmlkZXIge1xuXG5cdHByaXZhdGUgdXJsOiBzdHJpbmc7XG5cdHByaXZhdGUgY29sbGVjdGlvbk5hbWU6IHN0cmluZztcblxuXHRwcml2YXRlIGNsaWVudDogTW9uZ29DbGllbnQ7XG5cdHByaXZhdGUgZGI6IERiO1xuXHRwcml2YXRlIGNvbGxlY3Rpb246IENvbGxlY3Rpb247XG5cdFxuXHRwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBNb25nb0RCUHJvdmlkZXJPcHRpb25zKSB7XG5cdFx0dGhpcy51cmwgPSBvcHRpb25zLnVybDtcblx0XHR0aGlzLmNvbGxlY3Rpb25OYW1lID0gb3B0aW9ucy5jb2xsZWN0aW9uIHx8IFwiVnVsdHJleFwiO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGluaXQoKSB7XG5cdFx0dGhpcy5jbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodGhpcy51cmwsIHsgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlIH0pO1xuXHRcdGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcblxuXHRcdHRoaXMuZGIgPSB0aGlzLmNsaWVudC5kYigpO1xuXHRcdHRoaXMuY29sbGVjdGlvbiA9IHRoaXMuZGIuY29sbGVjdGlvbih0aGlzLmNvbGxlY3Rpb25OYW1lKTtcblx0XHR0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBzZXQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIHZhbHVlOiBhbnkpIHtcblx0XHR0aGlzLmNvbGxlY3Rpb24udXBkYXRlT25lKHsgX2lkOiBrZXkgfSwgeyAkc2V0OiB7IF9pZDoga2V5LCB2YWx1ZSB9IH0sIHsgdXBzZXJ0OiB0cnVlIH0pO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGdldDxUPihrZXk6IHN0cmluZyB8IG51bWJlciwgZGVmYXVsdFZhbHVlOiBhbnkpOiBQcm9taXNlPFQ+IHtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmZpbmRPbmUoeyBfaWQ6IGtleSB9KTtcblx0XHRjb25zdCByZXN1bHQgPSBkYXRhW1widmFsdWVcIl07XG5cdFx0cmV0dXJuIHJlc3VsdCAhPT0gbnVsbCA/IHJlc3VsdCA6IGRlZmF1bHRWYWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBnZXRBbGwoKTogUHJvbWlzZTxSb3dEYXRhW10+IHtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5jb2xsZWN0aW9uLmZpbmQoe30pLnRvQXJyYXkoKTtcblx0XHRyZXR1cm4gZGF0YS5tYXAoZGF0YSA9PiAoeyBrZXk6IGRhdGFbXCJfaWRcIl0sIHZhbHVlOiBkYXRhW1widmFsdWVcIl0gfSkpO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIHNpemUoKTogUHJvbWlzZTxudW1iZXI+IHtcblx0XHRyZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmNvdW50RG9jdW1lbnRzKCk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZGVsZXRlKGtleTogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5jb2xsZWN0aW9uLmRlbGV0ZU9uZSh7IF9pZDoga2V5IH0pO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuY29sbGVjdGlvbi5kcm9wKCk7XG5cdH1cbn0iXX0=