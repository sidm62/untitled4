import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/apiHooks';
//hh
const Home = () => {

    const { mediaArray } = useMedia();

    return (
        <section>
            <h2>Kuvat ja videot</h2>
            <div className="media-list">
                {mediaArray.map((item) => (
                    <MediaRow key={item.media_id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Home;
//