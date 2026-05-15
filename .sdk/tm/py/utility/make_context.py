# Pony SDK utility: make_context

from core.context import PonyContext


def make_context_util(ctxmap, basectx):
    return PonyContext(ctxmap, basectx)
