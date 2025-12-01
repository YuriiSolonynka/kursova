import catalogueService from '../services/catalogueService.js';

export const getFullCatalogue = async (req, res) => {
    try {
        const iterator = await catalogueService.createIterator();

        const catalogueList = [];

        let result = iterator.next();
        while (!result.done) {
            catalogueList.push(result.value);
            result = iterator.next();
        }

        res.json({
            count: catalogueList.length,
            items: catalogueList
        });

    } catch (err) {
        console.error("Catalogue iteration error:", err);
        res.status(500).json({ error: "Failed to fetch catalogue" });
    }
};