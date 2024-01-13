import json
from urllib import request
import itertools


def _create_node_dict_by_title(prompt: dict[str, any]):
    d: dict[str, any] = {}

    for node in prompt.values():
        if type(node) is not dict:
            continue

        meta = node["_meta"]
        if type(meta) is not dict:
            continue

        title = meta["title"]
        if type(title) is not str:
            continue

        d[title] = node

    return d


def _main():
    with open("workflow_api.json", encoding="utf-8") as f:
        prompt_text = f.read()

    prompt: dict[str, any] = json.loads(prompt_text)
    node_dict_by_title: dict[str, any] = _create_node_dict_by_title(prompt)

    x_label = "cfg"
    y_label = "steps"
    xx = [2, 4, 6, 8]
    yy = [4, 8, 12, 16]
    ksampler_node = node_dict_by_title["KSampler"]
    save_image_node = node_dict_by_title["Save Image"]

    for [x, y] in itertools.product(xx, yy):
        ksampler_node["inputs"]["cfg"] = x
        ksampler_node["inputs"]["steps"] = y
        save_image_node["inputs"]["filename_prefix"] = (
            x_label + str(x) + "_" + y_label + str(y)
        )

        request.urlopen(
            request.Request(
                "http://127.0.0.1:8188/prompt",
                data=json.dumps({"prompt": prompt}).encode("utf-8"),
            )
        )


if __name__ == "__main__":
    _main()
