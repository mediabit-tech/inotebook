import Notes from "./Notes"

export const Home = (props) => {
    const { showAlert } = props;
    return (

        <div>
            {/* Fetch all Notes from db */}
            <Notes showAlert={showAlert} />
        </div>
    )
}
