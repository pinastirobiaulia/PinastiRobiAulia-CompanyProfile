import ProductRevenue from "../components/dashboard/ProductRevenue";
import DailyActivity from "../components/dashboard/DailyActivity";
import BlogCards from "../components/dashboard/BlogCards";

const Page = () => {
    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Our Projects */}
            <div className="col-span-12">
                <ProductRevenue />
            </div>

            {/* Articles / DailyActivity */}
            <div className="col-span-12">
                <DailyActivity />
            </div>

            {/* Blog Cards */}
            <div className="col-span-12">
                <BlogCards />
            </div>
        </div>
    );
};

export default Page;
