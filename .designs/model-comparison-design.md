# Model comparison

## Summary

Add a comparison view for models in the same category.

## Data

Use data defined by the [model catalogue convention](./model-catalogue-convention.md)
and [benchmark convention](./benchmarks-convention.md).

## Model Selection

- Store selected model slugs in browser local storage.
- Make the selection limit configurable. Use three models by default.
- Use the first selected model to set the comparison category.
- A model with multiple categories can be selected when it shares at least one
  category with the selected models.
- For a model from a different category, keep the current selection and show:

  > This model cannot be added. Select models from the same category to compare them.

- When the selection has reached the limit, keep the current selection and show:

  > You can compare up to {maximum} models. Remove a model before adding another.

## Comparison bar

Show the comparison bar after the first model is selected. Include:

- a **Compare now** button; and
- a **Clear all** button.

Enable **Compare now** when at least two models are selected.

## Comparison window

Open a full-screen modal window

### Model details

| Attribute | Metadata source |
| --- | --- |
| Model type | `model_type` |
| Supported chipsets | `chipset:<alias>` tags |
| Model size | `size` |
| Datasets | `datasets` |
| License | `license` |

Show `title`, `thumbnail`, and `subtitle` in the column header. Show `code` and
`paper` as links outside the comparison rows. Use domain and category tags to
check whether models can be compared.

### Benchmarks

Show benchmark values in charts below the model details.
